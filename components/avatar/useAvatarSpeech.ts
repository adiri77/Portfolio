"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AVATAR_TOPICS, type AvatarTopic } from "@/config/avatar";

const MALE_VOICE_HINTS = [
  "male",
  "david",
  "mark",
  "guy",
  "daniel",
  "james",
  "ryan",
  "george",
  "thomas",
  "aaron",
  "fred",
  "richard",
  "paul",
];

const FEMALE_VOICE_HINTS = [
  "female",
  "samantha",
  "zira",
  "susan",
  "hazel",
  "catherine",
  "karen",
  "linda",
  "heather",
  "victoria",
  "jenny",
  "aria",
  "sara",
  "natasha",
];

function pickMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));

  const maleVoice = englishVoices.find((voice) => {
    const name = voice.name.toLowerCase();
    const isFemale = FEMALE_VOICE_HINTS.some((hint) => name.includes(hint));
    if (isFemale) return false;
    return MALE_VOICE_HINTS.some((hint) => name.includes(hint));
  });

  if (maleVoice) return maleVoice;

  const nonFemaleVoice = englishVoices.find((voice) => {
    const name = voice.name.toLowerCase();
    return !FEMALE_VOICE_HINTS.some((hint) => name.includes(hint));
  });

  return nonFemaleVoice ?? englishVoices[0];
}

export function useAvatarSpeech() {
  const [currentTopic, setCurrentTopic] = useState<AvatarTopic>("intro");
  const [speechText, setSpeechText] = useState(
    'Hi! I\'m Aditya. Click "Listen" and I\'ll walk you through my expertise, experience, and projects.'
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  const typewriterTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maleVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const typewriteText = useCallback((text: string) => {
    if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
    setSpeechText("");
    let index = 0;
    typewriterTimerRef.current = setInterval(() => {
      if (index < text.length) {
        setSpeechText(text.slice(0, index + 1));
        index++;
      } else if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
    }, 20);
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
  }, []);

  const speakTopic = useCallback(
    (topic: AvatarTopic) => {
      stopSpeech();
      setCurrentTopic(topic);
      const text = AVATAR_TOPICS[topic];

      typewriteText(text);

      if (typeof window === "undefined" || !window.speechSynthesis) {
        setSpeechText(text);
        return;
      }

      const speakWithMaleVoice = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.94;
        utterance.pitch = 0.9;

        const voices = window.speechSynthesis.getVoices();
        const maleVoice = maleVoiceRef.current ?? pickMaleVoice(voices);
        if (maleVoice) {
          maleVoiceRef.current = maleVoice;
          utterance.voice = maleVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      };

      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        const onVoicesReady = () => {
          maleVoiceRef.current = pickMaleVoice(window.speechSynthesis.getVoices()) ?? null;
          window.speechSynthesis.removeEventListener("voiceschanged", onVoicesReady);
          speakWithMaleVoice();
        };
        window.speechSynthesis.addEventListener("voiceschanged", onVoicesReady);
        return;
      }

      maleVoiceRef.current = pickMaleVoice(voices) ?? null;
      speakWithMaleVoice();
    },
    [stopSpeech, typewriteText]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const cacheMaleVoice = () => {
      maleVoiceRef.current = pickMaleVoice(window.speechSynthesis.getVoices()) ?? null;
    };

    cacheMaleVoice();
    window.speechSynthesis.addEventListener("voiceschanged", cacheMaleVoice);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", cacheMaleVoice);
  }, []);

  useEffect(() => () => stopSpeech(), [stopSpeech]);

  return {
    currentTopic,
    speechText,
    isSpeaking,
    speakTopic,
    stopSpeech,
  };
}

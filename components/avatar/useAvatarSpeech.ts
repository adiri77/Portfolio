"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AVATAR_TOPICS, type AvatarTopic } from "@/config/avatar";

const FEMALE_VOICE_HINTS = [
  "female",
  "woman",
  "girl",
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
  "sonia",
  "emma",
  "michelle",
  "lisa",
  "nancy",
  "monica",
  "laura",
  "olivia",
  "sophia",
  "allison",
  "joanna",
  "kendra",
  "kimberly",
  "ivy",
  "salli",
  "amy",
  "nicole",
];

function isFemaleVoice(name: string): boolean {
  const normalized = name.toLowerCase();
  return FEMALE_VOICE_HINTS.some((hint) => normalized.includes(hint));
}

function isEnglishVoice(voice: SpeechSynthesisVoice): boolean {
  return voice.lang.toLowerCase().startsWith("en");
}

function pickMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const englishVoices = voices.filter(isEnglishVoice);

  const explicitMale = englishVoices.find((voice) => {
    const name = voice.name;
    if (isFemaleVoice(name)) return false;
    return (
      /male/i.test(name) ||
      /david/i.test(name) ||
      /mark/i.test(name) ||
      /guy/i.test(name) ||
      /alex/i.test(name) ||
      /fred/i.test(name) ||
      /james/i.test(name) ||
      /daniel/i.test(name) ||
      /ryan/i.test(name) ||
      /george/i.test(name) ||
      /thomas/i.test(name) ||
      /aaron/i.test(name) ||
      /richard/i.test(name) ||
      /paul/i.test(name) ||
      /brian/i.test(name) ||
      /roger/i.test(name)
    );
  });

  if (explicitMale) return explicitMale;

  const microsoftMale = englishVoices.find((voice) => {
    const name = voice.name.toLowerCase();
    return (
      name.includes("microsoft") &&
      !isFemaleVoice(voice.name) &&
      !name.includes("google")
    );
  });

  return microsoftMale;
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

  const speakWithMaleVoice = useCallback((text: string, voices: SpeechSynthesisVoice[]) => {
    const synth = window.speechSynthesis;
    const maleVoice = pickMaleVoice(voices) ?? maleVoiceRef.current;

    if (!maleVoice) {
      return false;
    }

    maleVoiceRef.current = maleVoice;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.94;
    utterance.pitch = 0.85;
    utterance.lang = maleVoice.lang;
    utterance.voice = maleVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.cancel();
    if (synth.paused) {
      synth.resume();
    }
    synth.speak(utterance);

    return true;
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

      const synth = window.speechSynthesis;
      const voices = synth.getVoices();

      if (speakWithMaleVoice(text, voices)) {
        return;
      }

      const onVoicesReady = () => {
        const loadedVoices = synth.getVoices();
        const maleVoice = pickMaleVoice(loadedVoices);

        if (maleVoice) {
          maleVoiceRef.current = maleVoice;
          synth.removeEventListener("voiceschanged", onVoicesReady);
          speakWithMaleVoice(text, loadedVoices);
        }
      };

      synth.addEventListener("voiceschanged", onVoicesReady);
      synth.getVoices();
    },
    [speakWithMaleVoice, stopSpeech, typewriteText]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const cacheMaleVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      maleVoiceRef.current = pickMaleVoice(voices) ?? maleVoiceRef.current;
    };

    cacheMaleVoice();
    window.speechSynthesis.addEventListener("voiceschanged", cacheMaleVoice);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", cacheMaleVoice);
    };
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

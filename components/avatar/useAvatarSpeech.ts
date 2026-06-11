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

function pickMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));

  return (
    englishVoices.find((voice) => {
      const name = voice.name;
      if (isFemaleVoice(name)) return false;
      return /male|david|mark|guy|alex|fred|james|daniel|ryan|george|thomas|aaron|richard|paul|brian|roger/i.test(
        name
      );
    }) ??
    englishVoices.find((voice) => {
      const name = voice.name.toLowerCase();
      return name.includes("microsoft") && !isFemaleVoice(voice.name) && !name.includes("google");
    }) ??
    englishVoices.find((voice) => !isFemaleVoice(voice.name))
  );
}

export function useAvatarSpeech() {
  const [currentTopic, setCurrentTopic] = useState<AvatarTopic>("intro");
  const [speechText, setSpeechText] = useState(
    'Hi! I\'m Aditya. Click "Listen" and I\'ll walk you through my expertise, experience, and projects.'
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  const typewriterTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speakingTimeoutRef = useRef<number | null>(null);

  const clearSpeakingTimeout = useCallback(() => {
    if (speakingTimeoutRef.current) {
      window.clearTimeout(speakingTimeoutRef.current);
      speakingTimeoutRef.current = null;
    }
  }, []);

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
    clearSpeakingTimeout();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
  }, [clearSpeakingTimeout]);

  const startSpeech = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        setSpeechText(text);
        return;
      }

      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const maleVoice = pickMaleVoice(voices);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.94;
      utterance.pitch = 0.85;
      utterance.lang = maleVoice?.lang ?? "en-US";

      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        clearSpeakingTimeout();
        speakingTimeoutRef.current = window.setTimeout(() => {
          setIsSpeaking(false);
        }, Math.max(text.length * 70, 4000));
      };

      utterance.onend = () => {
        clearSpeakingTimeout();
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        clearSpeakingTimeout();
        setIsSpeaking(false);
      };

      if (synth.paused) {
        synth.resume();
      }

      synth.speak(utterance);
    },
    [clearSpeakingTimeout]
  );

  const speakTopic = useCallback(
    (topic: AvatarTopic) => {
      const text = AVATAR_TOPICS[topic];

      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
      clearSpeakingTimeout();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      setCurrentTopic(topic);
      setIsSpeaking(false);
      typewriteText(text);

      if (typeof window === "undefined" || !window.speechSynthesis) {
        setSpeechText(text);
        return;
      }

      const synth = window.speechSynthesis;
      const beginSpeech = () => {
        queueMicrotask(() => startSpeech(text));
      };

      const voices = synth.getVoices();

      if (voices.length > 0) {
        beginSpeech();
        return;
      }

      const onVoicesReady = () => {
        synth.removeEventListener("voiceschanged", onVoicesReady);
        beginSpeech();
      };

      synth.addEventListener("voiceschanged", onVoicesReady);
      synth.getVoices();
    },
    [clearSpeakingTimeout, startSpeech, typewriteText]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    const primeVoices = () => {
      synth.getVoices();
    };

    primeVoices();
    synth.addEventListener("voiceschanged", primeVoices);

    const timers = [100, 300, 600].map((delay) => window.setTimeout(primeVoices, delay));

    return () => {
      synth.removeEventListener("voiceschanged", primeVoices);
      timers.forEach((timer) => window.clearTimeout(timer));
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

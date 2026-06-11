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
  "libby",
  "maisie",
  "ana",
  "moira",
  "tessa",
];

const MALE_VOICE_PRIORITY = [
  "david",
  "mark",
  "guy",
  "male",
  "alex",
  "fred",
  "james",
  "daniel",
  "ryan",
  "george",
  "thomas",
  "aaron",
  "richard",
  "paul",
  "brian",
  "roger",
  "christopher",
  "steven",
  "eric",
  "gordon",
  "arthur",
  "tom",
];

function isFemaleVoice(name: string): boolean {
  const normalized = name.toLowerCase();
  return FEMALE_VOICE_HINTS.some((hint) => normalized.includes(hint));
}

function isAllowedMaleVoice(voice: SpeechSynthesisVoice): boolean {
  const name = voice.name;
  const normalized = name.toLowerCase();

  if (!voice.lang.toLowerCase().startsWith("en")) return false;
  if (isFemaleVoice(name)) return false;

  if (/google/i.test(normalized) && !normalized.includes("male")) {
    return false;
  }

  return MALE_VOICE_PRIORITY.some((hint) => normalized.includes(hint));
}

function pickMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const maleVoices = voices.filter(isAllowedMaleVoice);

  for (const hint of MALE_VOICE_PRIORITY) {
    const match = maleVoices.find((voice) => voice.name.toLowerCase().includes(hint));
    if (match) return match;
  }

  return undefined;
}

export function useAvatarSpeech() {
  const [currentTopic, setCurrentTopic] = useState<AvatarTopic>("intro");
  const [speechText, setSpeechText] = useState(
    'Hi! I\'m Aditya. Click "Listen" and I\'ll walk you through my expertise, experience, and projects.'
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  const typewriterTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speakingTimeoutRef = useRef<number | null>(null);
  const maleVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const clearSpeakingTimeout = useCallback(() => {
    if (speakingTimeoutRef.current) {
      window.clearTimeout(speakingTimeoutRef.current);
      speakingTimeoutRef.current = null;
    }
  }, []);

  const cacheMaleVoice = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const maleVoice = pickMaleVoice(window.speechSynthesis.getVoices());
    if (maleVoice) {
      maleVoiceRef.current = maleVoice;
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
      const maleVoice = pickMaleVoice(synth.getVoices()) ?? maleVoiceRef.current;

      if (!maleVoice || !isAllowedMaleVoice(maleVoice)) {
        return;
      }

      maleVoiceRef.current = maleVoice;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.94;
      utterance.pitch = 0.82;
      utterance.lang = maleVoice.lang;
      utterance.voice = maleVoice;

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
      cacheMaleVoice();

      const beginSpeech = () => {
        cacheMaleVoice();
        queueMicrotask(() => startSpeech(text));
      };

      const voices = synth.getVoices();

      if (pickMaleVoice(voices) ?? maleVoiceRef.current) {
        beginSpeech();
        return;
      }

      const onVoicesReady = () => {
        cacheMaleVoice();
        if (pickMaleVoice(synth.getVoices()) ?? maleVoiceRef.current) {
          synth.removeEventListener("voiceschanged", onVoicesReady);
          beginSpeech();
        }
      };

      synth.addEventListener("voiceschanged", onVoicesReady);
      synth.getVoices();
    },
    [cacheMaleVoice, clearSpeakingTimeout, startSpeech, typewriteText]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;

    cacheMaleVoice();
    synth.addEventListener("voiceschanged", cacheMaleVoice);

    const timers = [100, 300, 600, 1000].map((delay) =>
      window.setTimeout(cacheMaleVoice, delay)
    );

    return () => {
      synth.removeEventListener("voiceschanged", cacheMaleVoice);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [cacheMaleVoice]);

  useEffect(() => () => stopSpeech(), [stopSpeech]);

  return {
    currentTopic,
    speechText,
    isSpeaking,
    speakTopic,
    stopSpeech,
  };
}

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

function isBlockedVoice(voice: SpeechSynthesisVoice): boolean {
  const normalized = voice.name.toLowerCase();
  if (!voice.lang.toLowerCase().startsWith("en")) return true;
  if (isFemaleVoice(voice.name)) return true;
  if (/google/i.test(normalized) && !normalized.includes("male")) return true;
  return false;
}

function pickMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const candidates = voices.filter((voice) => !isBlockedVoice(voice));

  for (const hint of MALE_VOICE_PRIORITY) {
    const match = candidates.find((voice) => {
      const name = voice.name.toLowerCase();
      const uri = voice.voiceURI.toLowerCase();
      return name.includes(hint) || uri.includes(hint);
    });
    if (match) return match;
  }

  return undefined;
}

function loadVoices(synth: SpeechSynthesis): SpeechSynthesisVoice[] {
  return synth.getVoices();
}

export function useAvatarSpeech() {
  const [currentTopic, setCurrentTopic] = useState<AvatarTopic>("intro");
  const [speechText, setSpeechText] = useState(
    'Hi! I\'m Aditya. Click "Listen" and I\'ll walk you through my expertise, experience, and projects.'
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  const typewriterTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maleVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const cacheMaleVoice = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const maleVoice = pickMaleVoice(loadVoices(window.speechSynthesis));
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

      const synth = window.speechSynthesis;
      cacheMaleVoice();

      let maleVoice = pickMaleVoice(loadVoices(synth)) ?? maleVoiceRef.current;

      if (!maleVoice) {
        cacheMaleVoice();
        maleVoice = pickMaleVoice(loadVoices(synth)) ?? maleVoiceRef.current;
      }

      if (!maleVoice) {
        return;
      }

      maleVoiceRef.current = maleVoice;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.94;
      utterance.pitch = 0.82;
      utterance.lang = maleVoice.lang;
      utterance.voice = maleVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      if (synth.paused) {
        synth.resume();
      }

      synth.speak(utterance);
    },
    [cacheMaleVoice, stopSpeech, typewriteText]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;

    const primeVoices = () => {
      cacheMaleVoice();
      loadVoices(synth);
    };

    primeVoices();
    synth.addEventListener("voiceschanged", primeVoices);

    const timers = [0, 100, 250, 500, 1000, 2000].map((delay) =>
      window.setTimeout(primeVoices, delay)
    );

    const handlePointerDown = () => {
      primeVoices();
    };
    document.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      synth.removeEventListener("voiceschanged", primeVoices);
      timers.forEach((timer) => window.clearTimeout(timer));
      document.removeEventListener("pointerdown", handlePointerDown);
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

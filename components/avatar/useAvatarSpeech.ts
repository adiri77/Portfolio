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
  "raveena",
  "aditi",
  "amy",
  "nicole",
];

const MALE_VOICE_PRIORITY: Array<{ pattern: RegExp; score: number }> = [
  { pattern: /\bdavid\b/i, score: 1000 },
  { pattern: /\bmark\b/i, score: 950 },
  { pattern: /\bguy\b/i, score: 900 },
  { pattern: /\bmale\b/i, score: 850 },
  { pattern: /\bjames\b/i, score: 800 },
  { pattern: /\bdaniel\b/i, score: 780 },
  { pattern: /\bryan\b/i, score: 760 },
  { pattern: /\bgeorge\b/i, score: 740 },
  { pattern: /\bthomas\b/i, score: 720 },
  { pattern: /\baaron\b/i, score: 700 },
  { pattern: /\bfred\b/i, score: 680 },
  { pattern: /\brichard\b/i, score: 660 },
  { pattern: /\bpaul\b/i, score: 640 },
  { pattern: /\bbrian\b/i, score: 620 },
  { pattern: /\beric\b/i, score: 600 },
  { pattern: /\broger\b/i, score: 580 },
  { pattern: /\bchristopher\b/i, score: 560 },
  { pattern: /\bsteffan\b/i, score: 540 },
  { pattern: /\bsteven\b/i, score: 520 },
];

function isFemaleVoice(name: string): boolean {
  const normalized = name.toLowerCase();
  return FEMALE_VOICE_HINTS.some((hint) => normalized.includes(hint));
}

function isExplicitlyMaleVoice(voice: SpeechSynthesisVoice): boolean {
  const name = voice.name;
  const lang = voice.lang.toLowerCase();

  if (!lang.startsWith("en") || isFemaleVoice(name)) {
    return false;
  }

  if (/google/i.test(name) && !/\bmale\b/i.test(name)) {
    return false;
  }

  return MALE_VOICE_PRIORITY.some(({ pattern }) => pattern.test(name));
}

function scoreMaleVoice(voice: SpeechSynthesisVoice): number {
  if (!isExplicitlyMaleVoice(voice)) {
    return Number.NEGATIVE_INFINITY;
  }

  let score = 0;

  for (const { pattern, score: points } of MALE_VOICE_PRIORITY) {
    if (pattern.test(voice.name)) {
      score = Math.max(score, points);
    }
  }

  const lang = voice.lang.toLowerCase();
  if (lang.startsWith("en-us")) score += 40;
  if (voice.localService) score += 20;

  return score;
}

function pickMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const ranked = voices
    .map((voice) => ({ voice, score: scoreMaleVoice(voice) }))
    .filter(({ score }) => Number.isFinite(score))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.voice;
}

function waitForVoices(timeoutMs = 1200): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const resolveIfReady = () => {
      const voices = synth.getVoices();
      if (pickMaleVoice(voices)) {
        resolve(voices);
        return true;
      }
      return false;
    };

    if (resolveIfReady()) return;

    const onVoicesChanged = () => {
      if (resolveIfReady()) {
        synth.removeEventListener("voiceschanged", onVoicesChanged);
      }
    };

    synth.addEventListener("voiceschanged", onVoicesChanged);
    synth.getVoices();

    window.setTimeout(() => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      resolve(synth.getVoices());
    }, timeoutMs);
  });
}

export function useAvatarSpeech() {
  const [currentTopic, setCurrentTopic] = useState<AvatarTopic>("intro");
  const [speechText, setSpeechText] = useState(
    'Hi! I\'m Aditya. Click "Listen" and I\'ll walk you through my expertise, experience, and projects.'
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  const typewriterTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speakRequestRef = useRef(0);

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
    speakRequestRef.current += 1;
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
      const requestId = speakRequestRef.current;

      typewriteText(text);

      if (typeof window === "undefined" || !window.speechSynthesis) {
        setSpeechText(text);
        return;
      }

      void waitForVoices().then((voices) => {
        if (requestId !== speakRequestRef.current) return;

        const maleVoice = pickMaleVoice(voices);
        if (!maleVoice) {
          return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.92;
        utterance.pitch = 0.8;
        utterance.lang = maleVoice.lang;
        utterance.voice = maleVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      });
    },
    [stopSpeech, typewriteText]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    void waitForVoices();
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

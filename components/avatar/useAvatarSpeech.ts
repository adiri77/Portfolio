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
  "kate",
  "fiona",
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
  "lee",
  "rishi",
];

function isIOSDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

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

  const localDavid = candidates.find(
    (voice) =>
      voice.localService &&
      (voice.name.toLowerCase().includes("david") || voice.voiceURI.toLowerCase().includes("david"))
  );
  if (localDavid) return localDavid;

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

function resolveVoice(
  voices: SpeechSynthesisVoice[],
  selected: SpeechSynthesisVoice
): SpeechSynthesisVoice {
  return (
    voices.find(
      (voice) => voice.voiceURI === selected.voiceURI && voice.name === selected.name
    ) ?? selected
  );
}

function loadSpeechVoices(synth: SpeechSynthesis, unlocked: { current: boolean }): SpeechSynthesisVoice[] {
  let voices = synth.getVoices();
  if (voices.length > 0) {
    return voices;
  }

  if (!unlocked.current && !isIOSDevice()) {
    unlocked.current = true;
    const unlock = new SpeechSynthesisUtterance(" ");
    unlock.volume = 0.01;
    unlock.rate = 10;
    synth.speak(unlock);
    synth.cancel();
    voices = synth.getVoices();
    if (voices.length > 0) {
      return voices;
    }
  }

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
  const voicesUnlockedRef = useRef(false);

  const cacheMaleVoice = useCallback((voices: SpeechSynthesisVoice[]) => {
    const maleVoice = pickMaleVoice(voices);
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
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);

      setCurrentTopic(topic);
      const text = AVATAR_TOPICS[topic];
      typewriteText(text);

      if (typeof window === "undefined" || !window.speechSynthesis) {
        setSpeechText(text);
        return;
      }

      const synth = window.speechSynthesis;

      if (synth.speaking || synth.pending) {
        synth.cancel();
      }

      const voices = loadSpeechVoices(synth, voicesUnlockedRef);
      cacheMaleVoice(voices);

      const selectedMale =
        pickMaleVoice(voices) ??
        (maleVoiceRef.current
          ? resolveVoice(voices, maleVoiceRef.current)
          : undefined);

      if (!selectedMale) {
        setIsSpeaking(false);
        return;
      }

      const maleVoice = resolveVoice(voices, selectedMale);
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
    [cacheMaleVoice, typewriteText]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;

    const primeVoices = () => {
      const voices = loadSpeechVoices(synth, voicesUnlockedRef);
      if (voices.length > 0) {
        cacheMaleVoice(voices);
      }
    };

    primeVoices();
    synth.addEventListener("voiceschanged", primeVoices);

    const timers = [100, 500, 1500].map((delay) => window.setTimeout(primeVoices, delay));
    const handleInteraction = () => primeVoices();

    document.addEventListener("touchstart", handleInteraction, { passive: true });
    document.addEventListener("pointerdown", handleInteraction, { passive: true });

    return () => {
      synth.removeEventListener("voiceschanged", primeVoices);
      timers.forEach((timer) => window.clearTimeout(timer));
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("pointerdown", handleInteraction);
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

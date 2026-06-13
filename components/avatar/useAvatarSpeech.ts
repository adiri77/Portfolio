"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AVATAR_TOPICS, type AvatarTopic } from "@/config/avatar";

function isFemaleVoice(name: string): boolean {
  const n = name.toLowerCase();
  return /female|zira|samantha|aria|susan|hazel|catherine|jenny|victoria|karen|linda|heather|michelle|emma|sonia|natasha|olivia|sophia/i.test(
    n
  );
}

function pickMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const english = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));

  const explicitMale = english.find((v) => {
    if (isFemaleVoice(v.name)) return false;
    return /david|mark|guy|male|alex|fred|james|daniel|ryan|george|thomas|aaron|richard|paul|brian|roger|gordon|arthur|tom|lee/i.test(
      v.name
    );
  });
  if (explicitMale) return explicitMale;

  const microsoftMale = english.find((v) => {
    const n = v.name.toLowerCase();
    return n.includes("microsoft") && !isFemaleVoice(v.name) && !n.includes("google");
  });
  if (microsoftMale) return microsoftMale;

  const googleMale = english.find(
    (v) => v.name.toLowerCase().includes("google") && v.name.toLowerCase().includes("male")
  );
  if (googleMale) return googleMale;

  return undefined;
}

export function useAvatarSpeech() {
  const [currentTopic, setCurrentTopic] = useState<AvatarTopic>("intro");
  const [speechText, setSpeechText] = useState(
    "Hi! I'm Aditya. Pick a topic above and press play — I'll walk you through my expertise, experience, and projects."
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  const typewriterTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.94;
      utterance.pitch = 0.85;
      utterance.lang = "en-US";

      const voices = synth.getVoices();
      const maleVoice = pickMaleVoice(voices);

      if (maleVoice) {
        utterance.voice = maleVoice;
        utterance.lang = maleVoice.lang;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synth.speak(utterance);
    },
    [stopSpeech, typewriteText]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    const loadVoices = () => synth.getVoices();

    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);

    return () => synth.removeEventListener("voiceschanged", loadVoices);
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

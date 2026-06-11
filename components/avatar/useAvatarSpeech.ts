"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AVATAR_TOPICS, type AvatarTopic } from "@/config/avatar";

export function useAvatarSpeech() {
  const [currentTopic, setCurrentTopic] = useState<AvatarTopic>("intro");
  const [speechText, setSpeechText] = useState(
    'Hi! I\'m Aditya. Click "Listen" and I\'ll walk you through my expertise, experience, and projects.'
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

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.94;
      utterance.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Male") || v.name.includes("David") || v.name.includes("Google"))) ||
        voices.find((v) => v.lang.startsWith("en"));
      if (preferred) utterance.voice = preferred;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [stopSpeech, typewriteText]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
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

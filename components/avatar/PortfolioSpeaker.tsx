"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AVATAR_TOPIC_LABELS, type AvatarTopic } from "@/config/avatar";
import { useAvatarSpeech } from "@/components/avatar/useAvatarSpeech";
import { ActionButton } from "@/components/ui/ActionButton";

const TOPIC_ICONS: Record<AvatarTopic, string> = {
  intro: "fas fa-user",
  skills: "fas fa-code",
  experience: "fas fa-briefcase",
  projects: "fas fa-folder-open",
};

export default function PortfolioSpeaker() {
  const { currentTopic, speechText, isSpeaking, speakTopic, stopSpeech } = useAvatarSpeech();
  const activeLabel = AVATAR_TOPIC_LABELS.find((t) => t.id === currentTopic)?.label ?? "About Me";

  return (
    <motion.div
      className="speaker-panel relative mx-auto w-full overflow-hidden rounded-3xl border border-aqua/25 bg-gradient-to-br from-cream via-cream-warm to-aqua-pale/40 shadow-[0_16px_48px_rgba(0,119,182,0.14)]"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-aqua/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 h-40 w-40 rounded-full bg-aqua-light/20 blur-3xl" />

      <div className="speaker-panel-inner relative flex flex-col items-center gap-5 text-center sm:gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-8">
        <div className="flex w-full max-w-[11rem] shrink-0 flex-col items-center gap-3">
          <motion.div
            className={`speaker-portrait relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-2xl border-4 bg-cream shadow-lg ${
              isSpeaking ? "border-aqua shadow-[0_0_28px_rgba(0,180,216,0.35)]" : "border-aqua/30"
            }`}
            animate={isSpeaking ? { scale: [1, 1.02, 1] } : { scale: 1 }}
            transition={{ duration: 1.2, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}
          >
            <Image
              alt="Aditya Singh"
              src="/Aditya.jpeg"
              fill
              priority
              sizes="(max-width: 768px) 176px, 200px"
              className="object-cover object-[50%_22%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aqua-dark/25 via-transparent to-transparent" />

            <AnimatePresence>
              {isSpeaking && (
                <motion.div
                  className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 bg-gradient-to-t from-aqua-dark/50 to-transparent px-3 pb-3 pt-8"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  {[0.45, 0.75, 1, 0.65, 0.5].map((scale, index) => (
                    <motion.span
                      key={index}
                      className="w-1 rounded-full bg-white/90"
                      style={{ height: 14 }}
                      animate={{ scaleY: [0.35, scale, 0.35] }}
                      transition={{
                        duration: 0.55,
                        repeat: Infinity,
                        delay: index * 0.08,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div>
            <p className="text-sm font-bold text-aqua-dark">Aditya Singh</p>
            <p className="text-xs text-text-secondary">Software Development Engineer</p>
          </div>
        </div>

        <div className="flex w-full min-w-0 max-w-xl flex-col items-center gap-4 lg:max-w-lg">
          <div className="flex w-full flex-col items-center gap-3">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-aqua-dark sm:text-xl">Hear my story</h2>
              <p className="mt-0.5 text-sm text-text-secondary">
                Tap a topic or press play — I&apos;ll narrate my portfolio for you.
              </p>
            </div>

            <div className="flex shrink-0 items-center justify-center gap-2 rounded-full border border-aqua/20 bg-cream/80 px-3 py-1.5">
              <motion.span
                className={`inline-flex h-2 w-2 shrink-0 rounded-full ${isSpeaking ? "bg-aqua" : "bg-aqua/40"}`}
                animate={isSpeaking ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.9, repeat: isSpeaking ? Infinity : 0 }}
              />
              <span className="text-xs font-semibold text-aqua-dark">
                {isSpeaking ? "Speaking" : "Ready"}
              </span>
            </div>
          </div>

          <div className="speaker-controls flex flex-wrap items-center justify-center gap-3">
            <ActionButton
              variant="primary"
              size="md"
              icon="fas fa-play"
              disabled={isSpeaking}
              onClick={() => speakTopic(currentTopic)}
            >
              Listen
            </ActionButton>
            <ActionButton variant="secondary" size="md" icon="fas fa-stop" onClick={stopSpeech}>
              Stop
            </ActionButton>
          </div>

          <div className="speaker-topic-tabs grid w-full grid-cols-2 gap-3 xl:grid-cols-4">
            {AVATAR_TOPIC_LABELS.map((topic) => (
              <ActionButton
                key={topic.id}
                variant="chip"
                size="chip"
                active={currentTopic === topic.id}
                icon={TOPIC_ICONS[topic.id]}
                onClick={() => speakTopic(topic.id)}
                className="speaker-topic-chip w-full"
              >
                {topic.label}
              </ActionButton>
            ))}
          </div>

          <div className="speaker-transcript relative w-full min-h-[8rem] rounded-2xl border border-aqua/20 bg-cream/90 text-left shadow-inner sm:min-h-[9rem]">
            <div className="speaker-transcript-header flex items-center justify-between gap-3 border-b border-aqua/10">
              <span className="text-xs font-semibold uppercase tracking-wide text-aqua-dark">
                {activeLabel}
              </span>
              {isSpeaking && (
                <motion.span
                  className="text-[0.65rem] font-medium text-aqua"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  Live
                </motion.span>
              )}
            </div>

            <p className="speaker-transcript-body text-sm leading-relaxed text-text-primary sm:text-[0.95rem]">
              {speechText}
              {isSpeaking && <span className="speaker-cursor ml-0.5 inline-block" aria-hidden />}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

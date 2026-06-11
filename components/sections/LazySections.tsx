"use client";

import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/About"));
const Education = dynamic(() => import("@/components/sections/Education"));
const Certifications = dynamic(() => import("@/components/sections/Certifications"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Achievements = dynamic(() => import("@/components/sections/Achievements"));
const AdditionalInfo = dynamic(() => import("@/components/sections/AdditionalInfo"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function LazySections() {
  return (
    <div className="pb-10 sm:pb-14 md:pb-16 lg:pb-20">
      <About />
      <Education />
      <Certifications />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <AdditionalInfo />
      <Contact />
    </div>
  );
}

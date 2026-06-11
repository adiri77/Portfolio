import FadeInSection from "@/components/layout/FadeInSection";
import SectionTitle from "@/components/ui/SectionTitle";
import MotionGrid, { MotionGridItem } from "@/components/ui/MotionGrid";
import { skillCategories } from "@/data/portfolio";

export default function Skills() {
  return (
    <FadeInSection id="skills">
      <SectionTitle>Technical Stack</SectionTitle>
      <p className="section-lead mx-auto mb-8 max-w-2xl text-center text-[0.9375rem] leading-relaxed text-text-muted sm:text-base">
        Production-focused tooling across AI orchestration, distributed backends, observability, and full-stack delivery.
      </p>
      <MotionGrid className="skills-grid grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {skillCategories.map((category) => (
          <MotionGridItem key={category.title}>
            <div className="skill-category h-full">
              <i className={`fas ${category.icon}`} />
              <h3>{category.title}</h3>
              <div className="skills-badges">
                {category.skills.map((skill) => (
                  <span className="skill-badge" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </MotionGridItem>
        ))}
      </MotionGrid>
    </FadeInSection>
  );
}

"use client";

import { motion } from "framer-motion";
import { Skill } from "@/lib/cv-data";

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryLabels: Record<Skill["category"], string> = {
  language: "Languages",
  framework: "Frameworks & Libraries",
  database: "Databases",
  cloud: "Cloud & Infrastructure",
  tool: "Tools & Practices",
  other: "Other",
};

const proficiencyColors: Record<Skill["proficiency"], string> = {
  expert: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  advanced: "bg-accent-soft text-accent",
  intermediate: "bg-surface-2 text-muted",
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  // Group skills by category
  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categoryOrder: Skill["category"][] = [
    "language",
    "framework",
    "database",
    "cloud",
    "tool",
    "other",
  ];

  return (
    <div className="space-y-6">
      {categoryOrder.map((category, categoryIndex) => {
        const categorySkills = groupedSkills[category];
        if (!categorySkills || categorySkills.length === 0) return null;

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              {categoryLabels[category]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <span
                  key={skill.name}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium ${proficiencyColors[skill.proficiency]}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

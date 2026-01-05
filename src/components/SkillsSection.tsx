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
  expert: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  advanced: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  intermediate: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
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
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
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

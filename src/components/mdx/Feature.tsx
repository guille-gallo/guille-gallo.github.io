"use client";

import { ReactNode } from "react";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface FeatureProps {
  icon: string;
  title: string;
  children: ReactNode;
}

function kebabToPascal(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function Feature({ icon, title, children }: FeatureProps) {
  const iconName = kebabToPascal(icon) as IconName;
  const IconComponent = LucideIcons[iconName] as React.ComponentType<{ className?: string }>;

  return (
    <div className="my-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mb-2 flex items-center gap-2">
        {IconComponent && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <IconComponent className="h-4 w-4" />
          </div>
        )}
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
      </div>
      <div className="ml-10 text-sm text-gray-600 dark:text-gray-400">{children}</div>
    </div>
  );
}

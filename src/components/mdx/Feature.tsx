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
    <div className="my-4 rounded-2xl border border-border/60 bg-surface-2/60 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2">
        {IconComponent && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <IconComponent className="h-4 w-4" />
          </div>
        )}
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      <div className="ml-10 text-sm text-muted">{children}</div>
    </div>
  );
}

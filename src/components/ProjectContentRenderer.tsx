"use client";

import { ReactNode } from "react";

interface ProjectContentRendererProps {
  content: ReactNode;
  fallbackDescription: string;
}

export function ProjectContentRenderer({ content, fallbackDescription }: ProjectContentRendererProps) {
  if (content) {
    return <div className="prose-sm mt-4">{content}</div>;
  }

  return (
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      {fallbackDescription}
    </p>
  );
}

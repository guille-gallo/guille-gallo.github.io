"use client";

import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { GitHubStats } from "@/lib/github";

interface GitHubStatsDisplayProps {
  stats: GitHubStats;
}

export function GitHubStatsDisplay({ stats }: GitHubStatsDisplayProps) {
  const statItems = [{ label: "Repositories", value: stats.totalRepos, icon: GitBranch }];

  return (
    <div className="grid grid-cols-1 gap-4 sm:max-w-xs sm:grid-cols-1 sm:mx-auto">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex flex-col items-center rounded-xl border border-whisper-border bg-surface p-4 text-center"
        >
          <item.icon className="mb-2 h-5 w-5 text-muted" />
          <span className="text-2xl font-bold text-heading">
            {item.value}
          </span>
          <span className="text-xs text-muted">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

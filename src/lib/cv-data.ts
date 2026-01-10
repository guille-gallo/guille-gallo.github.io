export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = current
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "database" | "cloud" | "other";
  proficiency: "expert" | "advanced" | "intermediate";
}

export interface CVData {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  linkedin?: string;
  github: string;
  website?: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

// ============================================
// CONFIGURE YOUR CV DATA HERE
// ============================================

export const cvData: CVData = {
  name: "Guillermo Gallo",
  title: "Senior Software Developer",
  email: "guille.gallo88@gmail.com", // Update with your email
  location: "Barcelona, Spain",
  bio: "I love what I do, I feel extremely fortunate about the fact that my job is one of the awesome things in my life. Welcome to my personal website.",
  linkedin: "https://www.linkedin.com/in/guillermo-gallo-79481751/", // Update or remove
  github: "https://github.com/guille-gallo",
  website: "https://guille-gallo.github.io",

  experience: [
    {
      id: "exp-1",
      company: "Company Name",
      role: "Senior Developer",
      location: "Remote / City, Country",
      startDate: "2022-01",
      endDate: null, // Current position
      description:
        "Lead developer responsible for architecting and implementing key features for the company's main product.",
      highlights: [
        "Led a team of 5 developers to deliver major product features",
        "Improved application performance by 40% through optimization",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
      ],
      technologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      id: "exp-2",
      company: "Previous Company",
      role: "Full Stack Developer",
      location: "City, Country",
      startDate: "2019-03",
      endDate: "2021-12",
      description:
        "Full stack development of web applications using modern JavaScript frameworks.",
      highlights: [
        "Developed and maintained multiple client-facing applications",
        "Mentored junior developers and conducted code reviews",
        "Introduced testing practices that increased code coverage to 80%",
      ],
      technologies: ["JavaScript", "Vue.js", "Python", "Django", "MySQL"],
    },
    // Add more experience entries as needed
  ],

  education: [
    {
      id: "edu-1",
      institution: "University Name",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      startDate: "2014",
      endDate: "2018",
      description: "Focus on software engineering and distributed systems.",
    },
    // Add more education entries as needed
  ],

  skills: [
    // Languages
    { name: "TypeScript", category: "language", proficiency: "expert" },
    { name: "JavaScript", category: "language", proficiency: "expert" },
    { name: "Python", category: "language", proficiency: "advanced" },
    { name: "SQL", category: "language", proficiency: "advanced" },

    // Frameworks
    { name: "React", category: "framework", proficiency: "expert" },
    { name: "Next.js", category: "framework", proficiency: "expert" },
    { name: "Node.js", category: "framework", proficiency: "expert" },
    { name: "Vue.js", category: "framework", proficiency: "advanced" },
    { name: "Express", category: "framework", proficiency: "advanced" },

    // Databases
    { name: "PostgreSQL", category: "database", proficiency: "advanced" },
    { name: "MongoDB", category: "database", proficiency: "intermediate" },
    { name: "Redis", category: "database", proficiency: "intermediate" },

    // Cloud & Tools
    { name: "AWS", category: "cloud", proficiency: "advanced" },
    { name: "Docker", category: "tool", proficiency: "advanced" },
    { name: "Git", category: "tool", proficiency: "expert" },
    { name: "CI/CD", category: "tool", proficiency: "advanced" },

    // Add more skills as needed
  ],
};

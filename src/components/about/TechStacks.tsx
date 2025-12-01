import React from "react";
import { FaReact, FaAws } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiPnpm,
  SiZod,
} from "react-icons/si";
import { IoKeyOutline } from "react-icons/io5";
import { SiGithubactions } from "react-icons/si"; 

interface Skill {
  name: string;
  Icon: React.ElementType;
  color: string;
  description: string;
}

interface SkillCardProps {
  skill: Skill;
}

const skills: Skill[] = [
  {
    name: "React",
    Icon: FaReact,
    color: "text-sky-500",
    description: "Modern component-based UI development with Hooks.",
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    color: "text-blue-600",
    description: "Type-safe codebase for large-scale application stability.",
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    color: "text-cyan-500",
    description:
      "Rapid, utility-first styling for responsive, maintainable design.",
  },
  {
    name: "Express",
    Icon: SiExpress,
    color: "text-gray-700",
    description: "Fast, minimal, and scalable Node.js backend API layer.",
  },
  {
    name: "JWT HTTP Cookie",
    Icon: IoKeyOutline,
    color: "text-red-500",
    description: "Secure, stateless authentication using HTTP-only cookies.",
  },
  {
    name: "Zod",
    Icon: SiZod,
    color: "text-yellow-600",
    description: "Runtime validation and schema definition for inputs/APIs.",
  },
  {
    name: "PostgreSQL",
    Icon: SiPostgresql,
    color: "text-indigo-600",
    description: "Robust, transactional relational database management.",
  },
  {
    name: "Prisma",
    Icon: SiPrisma,
    color: "text-emerald-500",
    description:
      "Next-generation ORM for type-safe database access and migration.",
  },
  {
    name: "AWS",
    Icon: FaAws,
    color: "text-orange-500",
    description:
      "Deployment, hosting, and scalable cloud services (EC2, S3, RDS, Cloudfront SES, Route 53).",
  },
  {
    name: "GitHub Actions",
    Icon: SiGithubactions,
    color: "text-purple-600",
    description: "Automate workflows with CI/CD pipelines and deployment.",
  },
  {
    name: "PNPM",
    Icon: SiPnpm,
    color: "text-amber-700",
    description:
      "Efficient package management, crucial for monorepo environments.",
  },
];

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const { Icon, color, name, description } = skill;

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-b-4 border-b-gray-200 hover:border-b-blue-500">
      <div className="flex flex-col h-full">
        <Icon className={`w-10 h-10 ${color} mb-3`} />
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 flex-grow">{description}</p>
      </div>
    </div>
  );
};

const TechStacks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-12 sm:mb-16 text-center pt-4 sm:pt-8 px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Tech Stack Used
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
          Demonstrating full-stack capability across modern framework, type
          systems, database, and infrastructure layers.
        </p>
      </header>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>

      <footer className="max-w-7xl mx-auto mt-16 text-center text-gray-400 text-sm">
        <p>
          <p>
            ❤️ with love{" "}
            <a
              href="https://kranthi.tech"
            >
              kranthi.tech
            </a>
          </p>
        </p>
      </footer>
    </div>
  );
};

export default TechStacks;

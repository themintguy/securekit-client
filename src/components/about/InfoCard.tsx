import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface InfoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
  link = "#",
}) => {
  const content = (
    <motion.div
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      className="relative p-[2px] rounded-2xl overflow-hidden group cursor-pointer"
      variants={{
        hover: { scale: 1.05 },
      }}
    >
  
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-sm rounded-2xl"
        variants={{
          hover: {
            opacity: 1,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 0.5 },
          },
        }}
        initial={{
          opacity: 0.3,
          scale: 1,
          filter: "blur(8px)",
        }}
      />

      <div className="relative bg-zinc-900 p-6 rounded-2xl flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
        <div className="mb-4 flex-shrink-0">{icon}</div>
        <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
        <p className="text-zinc-400 text-sm flex-grow">{description}</p>
      </div>
    </motion.div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
};

export default InfoCard;

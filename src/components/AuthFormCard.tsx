import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface AuthFormCardProps {
    children: ReactNode;
    onSubmit: (e: React.FormEvent) => void;
}

const AuthFormCard = ({ children, onSubmit }: AuthFormCardProps) => {
    return (
        <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
        relative z-10 w-full max-w-md
        bg-bg-surface/80 backdrop-blur-2xl
        p-6 rounded-2xl
        border border-emerald-400/20
        space-y-5
        shadow-[0_0_40px_rgba(52,211,153,0.15)]
      "
        >
            {children}
        </motion.form>
    );
};

export default AuthFormCard;

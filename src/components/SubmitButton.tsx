import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SubmitButtonProps {
    children: ReactNode;
    type?: "submit" | "button";
    disabled?: boolean;
}

const SubmitButton = ({ children, type = "submit", disabled = false }: SubmitButtonProps) => {
    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            type={type}
            disabled={disabled}
            className={`
        w-full py-2 rounded-lg
        bg-gradient-to-r from-emerald-400 to-green-500
        text-black font-semibold
        hover:opacity-90 transition
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
        >
            {children}
        </motion.button>
    );
};

export default SubmitButton;

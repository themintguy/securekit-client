import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-bg-main overflow-hidden gap-6">
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:32px_32px]" />

            {/* Background blobs */}
            <motion.div
                className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-emerald-400/40 rounded-full blur-3xl"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.div
                className="absolute -bottom-24 -right-24 w-120 h-[30rem] bg-green-500/40 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            {/* Branding */}
            <div className="relative z-10 text-center space-y-2 mb-2">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-500 tracking-tight">
                    {title}
                </h1>
                <p className="text-text-muted text-base">{subtitle}</p>
            </div>

            {/* Content */}
            {children}
        </div>
    );
};

export default AuthLayout;

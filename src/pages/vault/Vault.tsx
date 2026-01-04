import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { HiOutlineLockClosed } from "react-icons/hi";

const Vault = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-bg-main overflow-hidden text-text-primary px-4 py-12">
            <Navbar />

            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:32px_32px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-8"
            >
                <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-4 ring-1 ring-emerald-500/20 shadow-lg shadow-emerald-500/10">
                    <HiOutlineLockClosed size={48} />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Your <span className="text-emerald-400">Secure Vault</span>
                </h1>

                <p className="text-lg text-text-muted max-w-2xl">
                    This area is protected. Your files are encrypted with your personal key before they ever leave your device.
                </p>

                <div className="w-full h-64 bg-bg-surface/30 backdrop-blur-md rounded-2xl border border-white/5 flex items-center justify-center">
                    <p className="text-text-muted">Vault content will appear here</p>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default Vault;

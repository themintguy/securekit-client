import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const internalLinks = [
        { name: "Home", path: "/" },
        { name: "Vault", path: "/vault" },
        { name: "About", path: "/about" },
    ];

    const externalLinks = [
        { name: "Portfolio", path: "https://www.k31.tech", icon: <FaGlobe size={20} /> },
        { name: "GitHub", path: "https://github.com/themintguy", icon: <FaGithub size={20} /> },
    ];

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 backdrop-blur-md bg-bg-main/50 border-b border-white/5">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="text-2xl font-bold tracking-tight">
                    <span style={{ color: "var(--color-accent)" }}>Secure</span>
                    <span style={{ color: "var(--color-primary-soft)" }}>Kit</span>
                </div>

                {/* Desktop Menu - Internal Links */}
                <div className="hidden md:flex items-center gap-8 bg-bg-surface/30 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm shadow-sm">
                    {internalLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm font-medium text-text-muted hover:text-[#424242] transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Menu - External Links (Icons) */}
                <div className="hidden md:flex items-center gap-4">
                    {externalLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-[#424242] transition-colors p-2 hover:bg-[#424242]/5 rounded-full"
                            title={link.name}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-text-primary hover:text-[#424242] transition-colors"
                    >
                        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-bg-surface/95 backdrop-blur-xl border-b border-white/5 p-6 md:hidden flex flex-col gap-6 shadow-xl"
                    >
                        <div className="flex flex-col gap-4">
                            {internalLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-lg font-medium text-text-muted hover:text-[#424242] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex gap-6 justify-center">
                            {externalLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-muted hover:text-[#424242] transition-colors flex items-center gap-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.icon}
                                    <span className="text-sm font-medium">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

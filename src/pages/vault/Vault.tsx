import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import VaultActions from "../../components/VaultActions";
import { HiOutlineLockClosed, HiOutlineKey, HiOutlineShieldCheck, HiOutlineFingerPrint } from "react-icons/hi";

const Vault = () => {
    return (
        <div className="pt-10 relative min-h-screen flex flex-col bg-bg-main overflow-hidden text-text-primary">
            <Navbar />

            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.03)_1px,transparent_0)] bg-[size:32px_32px]" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12 space-y-12">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center space-y-6"
                >
                    <div className="p-4 rounded-2xl bg-accent/10 text-accent mb-2 ring-1 ring-accent/20 shadow-lg shadow-accent/10">
                        <HiOutlineLockClosed size={48} />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Your <span className="text-accent">Secure Vault</span>
                    </h1>

                    <p className="text-lg text-text-secondary max-w-2xl">
                        Zero-knowledge encryption ensures your data remains private and secure.
                    </p>
                </motion.div>

                {/* Security Explanation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-bg-surface rounded-2xl border border-border p-8 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <HiOutlineShieldCheck className="text-accent" size={32} />
                        <h2 className="text-2xl font-bold">How Your Vault is Secured</h2>
                    </div>

                    <div className="space-y-6 text-left">
                        <p className="text-text-secondary leading-relaxed">
                            Your vault uses military-grade encryption to protect your sensitive data. Here's how it works:
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Step 1 */}
                            <div className="bg-bg-muted rounded-xl p-6 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                                        <HiOutlineFingerPrint size={24} />
                                    </div>
                                    <h3 className="font-semibold text-lg">1. Authentication</h3>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    You unlock your vault using <strong>three secret answers</strong> and a <strong>PIN</strong>. These credentials are unique to you and never stored in plain text.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-bg-muted rounded-xl p-6 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                                        <HiOutlineKey size={24} />
                                    </div>
                                    <h3 className="font-semibold text-lg">2. Key Derivation</h3>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    Your inputs are processed with <strong>PBKDF2</strong> (Password-Based Key Derivation Function) to derive a <strong>256-bit AES encryption key</strong>.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-bg-muted rounded-xl p-6 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                                        <HiOutlineLockClosed size={24} />
                                    </div>
                                    <h3 className="font-semibold text-lg">3. Zero-Knowledge</h3>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    The derived key exists <strong>only in server memory</strong> during your session and is <strong>never stored</strong> on disk or in databases.
                                </p>
                            </div>
                        </div>

                        <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mt-6">
                            <div className="flex items-start gap-3">
                                <HiOutlineShieldCheck className="text-accent flex-shrink-0 mt-1" size={24} />
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-accent">What This Means for You</h4>
                                    <ul className="text-sm text-text-secondary space-y-2 list-disc list-inside">
                                        <li>Your data is encrypted with <strong>AES-256</strong>, the same standard used by governments and banks</li>
                                        <li>Even if our servers are compromised, your data remains encrypted and unreadable</li>
                                        <li>We cannot access your files—only you have the keys to decrypt them</li>
                                        <li>Your encryption key is derived from your credentials and never leaves your control</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Vault Actions */}
                <VaultActions />

                {/* Vault Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-bg-surface rounded-2xl border border-border p-8 shadow-sm"
                >
                    <h2 className="text-2xl font-bold mb-6">Your Files</h2>
                    <div className="w-full h-64 bg-bg-muted rounded-xl flex items-center justify-center">
                        <p className="text-text-muted">Vault content will appear here</p>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default Vault;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineKey, HiOutlineShieldCheck, HiOutlineClipboardCopy, HiOutlineCheckCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import { generateRecoveryCodes, getRecoveryStatus, submitRecoveryCode } from "../../api/recoveryService"
import type { RecoveryStatusResponse } from "../../api/recoveryService"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Recovery = () => {
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);
    const [recoveryStatus, setRecoveryStatus] = useState<RecoveryStatusResponse | null>(null);
    const [isLoadingStatus, setIsLoadingStatus] = useState(true);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [codeInput, setCodeInput] = useState("");
    const [isUsingCode, setIsUsingCode] = useState(false);

    useEffect(() => {
        fetchRecoveryStatus();
    }, []);

    const fetchRecoveryStatus = async () => {
        setIsLoadingStatus(true);
        try {
            const status = await getRecoveryStatus();
            setRecoveryStatus(status);
            if (status.total > 0) {
                setHasGenerated(true);
            }
        } catch (error) {
            console.error("Failed to fetch recovery status:", error);
        } finally {
            setIsLoadingStatus(false);
        }
    };

    const handleGenerateCodes = async () => {
        if (hasGenerated && recoveryStatus && recoveryStatus.total > 0) {
            toast.error("Recovery codes have already been generated");
            return;
        }

        setIsGenerating(true);
        try {
            const response = await generateRecoveryCodes();
            setRecoveryCodes(response.recovery_codes);
            setHasGenerated(true);
            toast.success("Recovery codes generated successfully!");

        
            await fetchRecoveryStatus();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to generate recovery codes");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopyCode = (code: string, index: number) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        toast.success("Code copied to clipboard");
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleCopyAll = () => {
        const allCodes = recoveryCodes.join("\n");
        navigator.clipboard.writeText(allCodes);
        toast.success("All codes copied to clipboard");
    };

    const handleUseCode = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!codeInput.trim()) {
            toast.error("Please enter a recovery code");
            return;
        }

        setIsUsingCode(true);
        try {
            const response = await submitRecoveryCode(codeInput.trim());
            toast.success(response.message || "Recovery code used successfully");
            setCodeInput("");

        
            await fetchRecoveryStatus();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to use recovery code");
        } finally {
            setIsUsingCode(false);
        }
    };

    return (
        <div className="pt-10 relative min-h-screen flex flex-col bg-bg-main text-text-primary">
            <Navbar />

            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto space-y-8">
        
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4"
                    >
                        <div className="flex justify-center">
                            <div className="p-4 rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
                                <HiOutlineKey size={48} />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold">Recovery Codes</h1>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Generate backup recovery codes to regain access to your vault if you forget your credentials.
                        </p>
                    </motion.div>

                    {!isLoadingStatus && recoveryStatus && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-bg-surface rounded-2xl border border-border p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <HiOutlineShieldCheck className="text-accent" size={24} />
                                <h2 className="text-xl font-bold">Recovery Status</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-bg-muted rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-accent">{recoveryStatus.total}</p>
                                    <p className="text-sm text-text-muted mt-1">Total</p>
                                </div>
                                <div className="bg-bg-muted rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-error">{recoveryStatus.used}</p>
                                    <p className="text-sm text-text-muted mt-1">Used</p>
                                </div>
                                <div className="bg-bg-muted rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-success">{recoveryStatus.remaining}</p>
                                    <p className="text-sm text-text-muted mt-1">Remaining</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {!recoveryCodes.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-bg-surface rounded-2xl border border-border p-8 text-center"
                        >
                            <p className="text-text-secondary mb-6">
                                {hasGenerated && recoveryStatus && recoveryStatus.total > 0
                                    ? "Recovery codes have already been generated for your account."
                                    : "Click the button below to generate your recovery codes. You can only do this once."}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleGenerateCodes}
                                disabled={isGenerating || (hasGenerated && recoveryStatus !== null && recoveryStatus.total > 0)}
                                className="px-8 py-4 rounded-xl bg-accent text-white font-bold text-lg shadow-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? "Generating..." : "Generate Recovery Codes"}
                            </motion.button>
                        </motion.div>
                    )}
                    {recoveryCodes.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-bg-surface rounded-2xl border border-border p-8"
                        >
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-2">Your Recovery Codes</h2>
                                <div className="bg-error/10 border border-error/20 rounded-xl p-4">
                                    <p className="text-error font-semibold">⚠️ Warning</p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Store these codes securely. They won't show again.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                {recoveryCodes.map((code, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center justify-between p-4 rounded-xl bg-bg-muted border border-border"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-text-muted font-mono text-sm">#{index + 1}</span>
                                            <code className="font-mono text-accent font-semibold">{code}</code>
                                        </div>
                                        <button
                                            onClick={() => handleCopyCode(code, index)}
                                            className="p-2 rounded-lg hover:bg-bg-surface transition-colors"
                                        >
                                            {copiedIndex === index ? (
                                                <HiOutlineCheckCircle className="text-success" size={20} />
                                            ) : (
                                                <HiOutlineClipboardCopy className="text-text-muted" size={20} />
                                            )}
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCopyAll}
                                className="w-full px-6 py-3 rounded-xl bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition-colors"
                            >
                                Copy All Codes
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Use Recovery Code Section */}
                    {hasGenerated && recoveryStatus && recoveryStatus.remaining > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-bg-surface rounded-2xl border border-border p-8"
                        >
                            <h2 className="text-2xl font-bold mb-4">Use Recovery Code</h2>
                            <p className="text-text-secondary mb-6">
                                Enter one of your recovery codes to regain access to your vault.
                            </p>
                            <form onSubmit={handleUseCode} className="space-y-4">
                                <input
                                    type="text"
                                    value={codeInput}
                                    onChange={(e) => setCodeInput(e.target.value)}
                                    placeholder="Enter recovery code (e.g., 14c6f0f9c756e76a)"
                                    disabled={isUsingCode}
                                    className="w-full px-4 py-3 rounded-xl bg-bg-muted border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isUsingCode || !codeInput.trim()}
                                    className="w-full px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUsingCode ? "Using Code..." : "Use Recovery Code"}
                                </motion.button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Recovery;

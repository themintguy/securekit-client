import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineX, HiOutlineCog, HiOutlineKey, HiOutlineQuestionMarkCircle, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface SetupVaultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (answers: string[], pin: string) => void;
}

const SetupVaultModal = ({ isOpen, onClose, onSubmit }: SetupVaultModalProps) => {
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [pin, setPin] = useState("");
    const [showPin, setShowPin] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit([answer1, answer2, answer3], pin);
    };

    const handleClose = () => {
        // Reset form
        setAnswer1("");
        setAnswer2("");
        setAnswer3("");
        setPin("");
        setShowPin(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-bg-surface rounded-2xl border border-border shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-border p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                                            <HiOutlineCog size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-text-primary">Setup Vault</h2>
                                            <p className="text-sm text-text-secondary">Create your security credentials</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="p-2 rounded-lg hover:bg-bg-muted transition-colors text-text-secondary hover:text-text-primary"
                                    >
                                        <HiOutlineX size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {/* Security Questions */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-text-secondary">
                                        <HiOutlineQuestionMarkCircle size={18} />
                                        <span className="text-sm font-medium">Security Questions</span>
                                    </div>

                                    {/* Question 1 */}
                                    <div className="space-y-2">
                                        <label htmlFor="setup-answer1" className="block text-sm font-medium text-text-primary">
                                            Question 1
                                        </label>
                                        <input
                                            id="setup-answer1"
                                            type="text"
                                            value={answer1}
                                            onChange={(e) => setAnswer1(e.target.value)}
                                            placeholder="Enter your answer"
                                            className="w-full px-4 py-3 bg-bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-text-primary placeholder:text-text-muted"
                                            required
                                        />
                                    </div>

                                    {/* Question 2 */}
                                    <div className="space-y-2">
                                        <label htmlFor="setup-answer2" className="block text-sm font-medium text-text-primary">
                                            Question 2
                                        </label>
                                        <input
                                            id="setup-answer2"
                                            type="text"
                                            value={answer2}
                                            onChange={(e) => setAnswer2(e.target.value)}
                                            placeholder="Enter your answer"
                                            className="w-full px-4 py-3 bg-bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-text-primary placeholder:text-text-muted"
                                            required
                                        />
                                    </div>

                                    {/* Question 3 */}
                                    <div className="space-y-2">
                                        <label htmlFor="setup-answer3" className="block text-sm font-medium text-text-primary">
                                            Question 3
                                        </label>
                                        <input
                                            id="setup-answer3"
                                            type="text"
                                            value={answer3}
                                            onChange={(e) => setAnswer3(e.target.value)}
                                            placeholder="Enter your answer"
                                            className="w-full px-4 py-3 bg-bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-text-primary placeholder:text-text-muted"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* PIN */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-text-secondary">
                                        <HiOutlineKey size={18} />
                                        <label htmlFor="setup-pin" className="text-sm font-medium">
                                            PIN Code
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            id="setup-pin"
                                            type={showPin ? "text" : "password"}
                                            value={pin}
                                            onChange={(e) => setPin(e.target.value)}
                                            placeholder="Create your 4-digit PIN"
                                            maxLength={4}
                                            pattern="[0-9]{4}"
                                            className="w-full px-4 py-3 bg-bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-text-primary placeholder:text-text-muted tracking-widest text-center text-lg font-semibold pr-12"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPin(!showPin)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-main"
                                        >
                                            {showPin ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        <span className="text-accent font-semibold">Important:</span> Remember your answers and PIN. They cannot be recovered if lost. These credentials will be used to encrypt and decrypt your vault.
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="flex-1 px-6 py-3 rounded-xl font-semibold bg-bg-muted border border-border text-text-primary hover:bg-bg-main transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl font-semibold bg-accent text-white hover:bg-accent-hover transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                                    >
                                        <HiOutlineCog size={20} />
                                        <span>Setup</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SetupVaultModal;

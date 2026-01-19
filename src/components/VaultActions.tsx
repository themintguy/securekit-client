import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineLockClosed, HiOutlineLockOpen, HiOutlineCog, HiOutlineStatusOnline } from "react-icons/hi";
import toast from "react-hot-toast";
import { getVaultStatus, unlockVault, lockVault, setupVault } from "../api/statusService";
import UnlockVaultModal from "./UnlockVaultModal";
import SetupVaultModal from "./SetupVaultModal";

const VaultActions = () => {
    const [isCheckingStatus, setIsCheckingStatus] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [isLocking, setIsLocking] = useState(false);
    const [isSettingUp, setIsSettingUp] = useState(false);
    const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

    const handleVaultStatus = async () => {
        setIsCheckingStatus(true);
        try {
            const response = await getVaultStatus();

            // Show toast for exists status
            if (response.exists) {
                toast.success("Vault exists", {
                    icon: "✅",
                });
            } else {
                toast("Vault does not exist", {
                    icon: "ℹ️",
                });
            }

            // Show toast for unlocked status
            if (response.unlocked) {
                toast.success("Vault is unlocked", {
                    icon: "🔓",
                });
            } else {
                toast("Vault is locked", {
                    icon: "🔒",
                });
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to check vault status");
        } finally {
            setIsCheckingStatus(false);
        }
    };

    const handleSetupVault = () => {
        setIsSetupModalOpen(true);
    };

    const handleSetupSubmit = async (answers: string[], pin: string) => {
        setIsSettingUp(true);
        setIsSetupModalOpen(false);

        try {
            // Prepare credentials in the required format
            const credentials = {
                ans1: answers[0],
                ans2: answers[1],
                ans3: answers[2],
                pin: pin
            };

            const response = await setupVault(credentials);

            // Toast the message from the response
            if (response.status === "success") {
                toast.success(response.message, {
                    icon: "⚙️",
                });
            } else {
                toast(response.message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to setup vault");
        } finally {
            setIsSettingUp(false);
        }
    };

    const handleLockVault = async () => {
        setIsLocking(true);
        try {
            const response = await lockVault();

            // Toast the message from the response
            if (response.status === "success") {
                toast.success(response.message, {
                    icon: "🔒",
                });
            } else {
                toast(response.message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to lock vault");
        } finally {
            setIsLocking(false);
        }
    };


    const handleUnlockVault = () => {
        setIsUnlockModalOpen(true);
    };

    const handleUnlockSubmit = async (answers: string[], pin: string) => {
        setIsUnlocking(true);
        setIsUnlockModalOpen(false);

        try {
            // Prepare credentials in the required format
            const credentials = {
                ans1: answers[0],
                ans2: answers[1],
                ans3: answers[2],
                pin: pin
            };

            const response = await unlockVault(credentials);

            // Toast the message from the response
            if (response.status === "success") {
                toast.success(response.message, {
                    icon: "🔓",
                });
            } else {
                toast(response.message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to unlock vault");
        } finally {
            setIsUnlocking(false);
        }
    };


    const buttons = [
        {
            label: "Vault Status",
            icon: HiOutlineStatusOnline,
            onClick: handleVaultStatus,
            variant: "secondary" as const,
        },
        {
            label: "Setup Vault",
            icon: HiOutlineCog,
            onClick: handleSetupVault,
            variant: "primary" as const,
        },
        {
            label: "Lock Vault",
            icon: HiOutlineLockClosed,
            onClick: handleLockVault,
            variant: "danger" as const,
        },
        {
            label: "Unlock Vault",
            icon: HiOutlineLockOpen,
            onClick: handleUnlockVault,
            variant: "success" as const,
        },
    ];

    const getButtonStyles = (variant: "primary" | "secondary" | "danger" | "success") => {
        const baseStyles = "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md";

        switch (variant) {
            case "primary":
                return `${baseStyles} bg-accent text-white hover:bg-accent-hover`;
            case "secondary":
                return `${baseStyles} bg-bg-surface border border-border text-text-primary hover:bg-bg-muted`;
            case "danger":
                return `${baseStyles} bg-error/10 text-error border border-error/20 hover:bg-error/20`;
            case "success":
                return `${baseStyles} bg-success/10 text-success border border-success/20 hover:bg-success/20`;
            default:
                return baseStyles;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-bg-surface rounded-2xl border border-border p-4 md:p-8 shadow-sm"
        >
            <h2 className="text-2xl font-bold mb-6">Vault Actions</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {buttons.map((button, index) => {
                    const Icon = button.icon;
                    return (
                        <motion.button
                            key={button.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                            onClick={button.onClick}
                            disabled={
                                (button.label === "Vault Status" && isCheckingStatus) ||
                                (button.label === "Unlock Vault" && isUnlocking) ||
                                (button.label === "Lock Vault" && isLocking) ||
                                (button.label === "Setup Vault" && isSettingUp)
                            }
                            className={getButtonStyles(button.variant)}
                        >
                            <Icon size={20} />
                            <span>
                                {button.label === "Vault Status" && isCheckingStatus
                                    ? "Checking..."
                                    : button.label === "Unlock Vault" && isUnlocking
                                        ? "Unlocking..."
                                        : button.label === "Lock Vault" && isLocking
                                            ? "Locking..."
                                            : button.label === "Setup Vault" && isSettingUp
                                                ? "Setting up..."
                                                : button.label}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Unlock Vault Modal */}
            <UnlockVaultModal
                isOpen={isUnlockModalOpen}
                onClose={() => setIsUnlockModalOpen(false)}
                onSubmit={handleUnlockSubmit}
            />

            {/* Setup Vault Modal */}
            <SetupVaultModal
                isOpen={isSetupModalOpen}
                onClose={() => setIsSetupModalOpen(false)}
                onSubmit={handleSetupSubmit}
            />
        </motion.div>
    );
};

export default VaultActions;

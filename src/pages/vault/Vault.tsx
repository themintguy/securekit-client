import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import VaultActions from "../../components/VaultActions";
import File from "../../components/File";
import { HiOutlineLockClosed, HiOutlineKey, HiOutlineShieldCheck, HiOutlineFingerPrint, HiOutlineDocumentText, HiOutlineEye, HiOutlineCloudUpload } from "react-icons/hi";
import { getVaultStatus } from "../../api/statusService";
import { getFiles, uploadFile, getStorageUsage } from "../../api/fileService";
import type { FileMetadata } from "../../api/fileService";
import toast from "react-hot-toast";

const Vault = () => {
    const navigate = useNavigate();
    const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
    const [files, setFiles] = useState<FileMetadata[]>([]);
    const [isLoadingFiles, setIsLoadingFiles] = useState(false);
    const [showFiles, setShowFiles] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [storageUsageMB, setStorageUsageMB] = useState<number>(0);

    // Check vault status on mount
    useEffect(() => {
        const checkVaultStatus = async () => {
            try {
                const response = await getVaultStatus();
                setIsVaultUnlocked(response.unlocked);
            } catch (error) {
                console.error("Failed to check vault status:", error);
            }
        };

        checkVaultStatus();

        // Poll vault status every 5 seconds
        const interval = setInterval(checkVaultStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleShowFiles = async () => {
        if (!isVaultUnlocked) {
            toast.error("Please unlock the vault first");
            return;
        }

        setIsLoadingFiles(true);
        try {
            const fetchedFiles = await getFiles();
            setFiles(fetchedFiles);
            setShowFiles(true);
            toast.success(`Loaded ${fetchedFiles.length} file(s)`);

            // Fetch storage usage
            await fetchStorageUsage();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to fetch files");
        } finally {
            setIsLoadingFiles(false);
        }
    };

    const fetchStorageUsage = async () => {
        try {
            const usage = await getStorageUsage();
            const usageMB = usage.total_bytes / (1024 * 1024);
            setStorageUsageMB(usageMB);
        } catch (error) {
            console.error("Failed to fetch storage usage:", error);
        }
    };

    const handleFileRefresh = async () => {
        try {
            const fetchedFiles = await getFiles();
            setFiles(fetchedFiles);
            await fetchStorageUsage();
        } catch (error) {
            console.error("Failed to refresh files:", error);
        }
    };

    const handleFileUpload = async (file: File) => {
        if (!isVaultUnlocked) {
            toast.error("Please unlock the vault first");
            return;
        }

        setIsUploading(true);
        try {
            const response = await uploadFile(file);
            toast.success(response.message || "File uploaded successfully");

            // Refresh files list and storage after upload
            if (showFiles) {
                await handleFileRefresh();
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to upload file");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            handleFileUpload(selectedFile);
        }
        // Reset input value to allow uploading the same file again
        event.target.value = "";
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            handleFileUpload(droppedFile);
        }
    };

    return (
        <div className="pt-10 relative min-h-screen flex flex-col bg-bg-main overflow-x-hidden text-text-primary">
            <Navbar />

            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.03)_1px,transparent_0)] bg-size-[32px_32px]" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8 md:space-y-12">
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

                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Your <span className="text-accent">Secure Vault</span>
                    </h1>

                    <p className="text-base md:text-lg text-text-secondary max-w-2xl px-4">
                        Zero-knowledge encryption ensures your data remains private and secure.
                    </p>
                </motion.div>

                {/* Security Explanation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-bg-surface rounded-2xl border border-border p-4 md:p-8 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <HiOutlineShieldCheck className="text-accent" size={32} />
                        <h2 className="text-xl md:text-2xl font-bold">How Your Vault is Secured</h2>
                    </div>

                    <div className="space-y-6 text-left">
                        <p className="text-text-secondary leading-relaxed">
                            Your vault uses military-grade encryption to protect your sensitive data. Here's how it works:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                <HiOutlineShieldCheck className="text-accent shrink-0 mt-1" size={24} />
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

                {/* Recovery Codes Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="flex justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/recovery")}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition-colors border border-accent/20 w-full sm:w-auto justify-center"
                    >
                        <HiOutlineKey size={20} />
                        Manage Recovery Codes
                    </motion.button>
                </motion.div>

                {/* Vault Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-bg-surface rounded-2xl border border-border p-4 md:p-8 shadow-sm"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <h2 className="text-xl md:text-2xl font-bold">Your Files</h2>
                        {isVaultUnlocked && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleShowFiles}
                                disabled={isLoadingFiles}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                            >
                                <HiOutlineEye size={20} />
                                {isLoadingFiles ? "Loading..." : "Show Files"}
                            </motion.button>
                        )}
                    </div>

                    {!isVaultUnlocked ? (
                        <div className="w-full h-64 bg-bg-muted rounded-xl flex items-center justify-center p-4">
                            <div className="text-center space-y-2">
                                <HiOutlineLockClosed className="mx-auto text-text-muted" size={48} />
                                <p className="text-text-muted">Please unlock the vault to view your files</p>
                            </div>
                        </div>
                    ) : !showFiles ? (
                        <div className="w-full h-64 bg-bg-muted rounded-xl flex items-center justify-center p-4">
                            <div className="text-center space-y-2">
                                <HiOutlineDocumentText className="mx-auto text-text-muted" size={48} />
                                <p className="text-text-muted">Click "Show Files" to view your encrypted files</p>
                            </div>
                        </div>
                    ) : files.length === 0 ? (
                        <div className="w-full h-64 bg-bg-muted rounded-xl flex items-center justify-center p-4">
                            <div className="text-center space-y-2">
                                <HiOutlineDocumentText className="mx-auto text-text-muted" size={48} />
                                <p className="text-text-muted">No files found in your vault</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-3">
                                {files.map((file, index) => (
                                    <File key={file.id} file={file} index={index} onDelete={handleFileRefresh} />
                                ))}
                            </div>

                            {/* Storage Usage Display */}
                            <div className="mt-6 p-4 rounded-xl bg-bg-muted border border-border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-text-primary">Storage Used</p>
                                        <p className="text-xs text-text-muted mt-1">Total space consumed by your files</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-accent">{storageUsageMB.toFixed(2)} MB</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Upload Section - Only show when vault is unlocked and files are shown */}
                    {isVaultUnlocked && showFiles && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 pt-6 border-t border-border"
                        >
                            <h3 className="text-lg font-semibold mb-4">Upload New File</h3>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging
                                    ? "border-accent bg-accent/10"
                                    : "border-border hover:border-accent/50 hover:bg-bg-muted"
                                    }`}
                            >
                                <input
                                    type="file"
                                    onChange={handleFileSelect}
                                    disabled={isUploading}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                />
                                <div className="space-y-3 pointer-events-none">
                                    <div className="flex justify-center">
                                        <div className="p-4 rounded-full bg-accent/10 border border-accent/20">
                                            <HiOutlineCloudUpload size={32} className="text-accent" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold text-text-primary">
                                            {isUploading ? "Uploading..." : "Drop file here or click to browse"}
                                        </p>
                                        <p className="text-sm text-text-muted mt-1">
                                            File will be encrypted before upload • Max file size: 99 MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default Vault;

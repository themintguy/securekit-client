import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineCloudUpload, HiOutlineDocumentText, HiX } from "react-icons/hi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const UploadFiles = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles((prev) => [...prev, ...filesArray]);
        }
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

        if (event.dataTransfer.files) {
            const filesArray = Array.from(event.dataTransfer.files);
            setSelectedFiles((prev) => [...prev, ...filesArray]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        alert(`Uploading ${selectedFiles.length} file(s)...`);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-bg-main text-text-primary">
            <Navbar />

            <div className="flex-1 px-4 py-8 pt-32 pb-24">
                <div className="max-w-4xl mx-auto space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-2"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold">
                            <span style={{ color: "var(--color-accent)" }}>Upload</span>{" "}
                            <span style={{ color: "var(--color-primary-soft)" }}>Files</span>
                        </h1>
                        <p className="text-text-muted">
                            Securely upload your files with zero-knowledge encryption
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragging
                                    ? "border-emerald-400 bg-emerald-400/10"
                                    : "border-white/20 hover:border-emerald-400/50 hover:bg-white/5"
                                }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileSelect}
                                className="hidden"
                            />

                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <div className="p-6 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                                        <HiOutlineCloudUpload size={48} className="text-emerald-400" />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xl font-semibold text-text-primary">
                                        Drop files here or click to browse
                                    </p>
                                    <p className="text-sm text-text-muted mt-2">
                                        All files are encrypted before upload
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {selectedFiles.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <h2 className="text-xl font-semibold">
                                Selected Files ({selectedFiles.length})
                            </h2>

                            <div className="space-y-2">
                                {selectedFiles.map((file, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center justify-between p-4 rounded-xl bg-bg-surface/50 border border-white/10 hover:bg-bg-surface/70 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="p-2 rounded-lg bg-emerald-400/10">
                                                <HiOutlineDocumentText size={24} className="text-emerald-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{file.name}</p>
                                                <p className="text-sm text-text-muted">
                                                    {formatFileSize(file.size)}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFile(index)}
                                            className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                                        >
                                            <HiX size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleUpload}
                                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 text-black font-bold text-lg shadow-lg shadow-emerald-400/20 hover:shadow-emerald-400/30 transition-all"
                            >
                                Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? "s" : ""}
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UploadFiles;

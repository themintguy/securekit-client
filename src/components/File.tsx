import { motion } from "framer-motion";
import { HiOutlineDocumentText, HiOutlineDownload, HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";
import toast from "react-hot-toast";
import { downloadFile, deleteFile } from "../api/fileService";
import type { FileMetadata } from "../api/fileService";

interface FileProps {
    file: FileMetadata;
    index: number;
    onDelete: () => void;
}

const File = ({ file, index, onDelete }: FileProps) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const formatFileSize = (bytes: string): string => {
        const numBytes = parseInt(bytes);
        if (numBytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(numBytes) / Math.log(k));
        return Math.round(numBytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await downloadFile(file.id, file.original_name);
            toast.success(`Downloaded ${file.original_name}`);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to download file");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${file.original_name}"?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteFile(file.id);
            toast.success(`Deleted ${file.original_name}`);
            onDelete(); // Trigger parent to refresh file list
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete file");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-bg-muted border border-border hover:bg-bg-surface/70 transition-colors gap-4"
        >
            <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0 w-full">
                <div className="p-2 rounded-lg bg-accent/10 shrink-0">
                    <HiOutlineDocumentText size={24} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium truncate pr-2">{file.original_name}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted mt-1">
                        <span>{formatFileSize(file.file_size_bytes)}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{file.mime_type}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{formatDate(file.uploaded_at)}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                {/* Download Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    disabled={isDownloading || isDeleting}
                    className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <HiOutlineDownload size={20} />
                    <span className="text-sm font-semibold">
                        {isDownloading ? "..." : "Download"}
                    </span>
                </motion.button>

                {/* Delete Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    disabled={isDownloading || isDeleting}
                    className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <HiOutlineTrash size={20} />
                    <span className="text-sm font-semibold">
                        {isDeleting ? "..." : "Delete"}
                    </span>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default File;

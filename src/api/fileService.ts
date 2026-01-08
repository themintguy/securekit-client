import { api } from "./api";
import { AxiosError } from "axios";

/**
 * File metadata structure returned from the backend
 */
export interface FileMetadata {
    id: string;
    original_name: string;
    file_size_bytes: string;
    mime_type: string;
    uploaded_at: string;
}

export interface GetFilesResponse {
    files: FileMetadata[];
}

export interface UploadFileResponse {
    status: string;
    message: string;
    fileId: string;
}

export const getFiles = async (): Promise<FileMetadata[]> => {
    try {
        const response = await api.get<FileMetadata[]>("/files");

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to fetch files";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        throw new Error(errorMessage);
    }
};

export const uploadFile = async (file: File): Promise<UploadFileResponse> => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post<UploadFileResponse>("/files/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to upload file";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        throw new Error(errorMessage);
    }
};

export const downloadFile = async (fileId: string, fileName: string): Promise<void> => {
    try {
        const response = await api.get(`/files/${fileId}`, {
            responseType: "blob",
        });

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to download file";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        throw new Error(errorMessage);
    }
};

export interface DeleteFileResponse {
    status: string;
    message: string;
}

export const deleteFile = async (fileId: string): Promise<DeleteFileResponse> => {
    try {
        const response = await api.delete<DeleteFileResponse>(`/files/${fileId}`);

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to delete file";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        throw new Error(errorMessage);
    }
};

export interface StorageUsageResponse {
    total_bytes: number;
}

export const getStorageUsage = async (): Promise<StorageUsageResponse> => {
    try {
        const response = await api.get<StorageUsageResponse>("/files/usage");

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to get storage usage";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        throw new Error(errorMessage);
    }
};

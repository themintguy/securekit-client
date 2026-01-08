import { api } from "./api";
import { AxiosError } from "axios";

export interface GenerateRecoveryResponse {
    status: string;
    recovery_codes: string[];
    warning: string;
}

export interface RecoveryStatusResponse {
    total: number;
    used: number;
    remaining: number;
}

export const generateRecoveryCodes = async (): Promise<GenerateRecoveryResponse> => {
    try {
        const response = await api.post<GenerateRecoveryResponse>("/recovery/generate");

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to generate recovery codes";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        throw new Error(errorMessage);
    }
};

export const getRecoveryStatus = async (): Promise<RecoveryStatusResponse> => {
    try {
        const response = await api.get<RecoveryStatusResponse>("/recovery/status");

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to get recovery status";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        throw new Error(errorMessage);
    }
};

export interface UseRecoveryCodeRequest {
    code: string;
}

export interface UseRecoveryCodeResponse {
    status: string;
    message: string;
}

export const submitRecoveryCode = async (code: string): Promise<UseRecoveryCodeResponse> => {
    try {
        const response = await api.post<UseRecoveryCodeResponse>("/recovery/usecode", { code });

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to use recovery code";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        throw new Error(errorMessage);
    }
};

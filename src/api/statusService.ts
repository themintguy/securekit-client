import { api } from "./api";
import { AxiosError } from "axios";

export interface VaultStatusResponse {
    exists: boolean;
    unlocked: boolean;
}

export interface VaultUnlockResponse {
    status: string;
    message: string;
}

export interface VaultLockResponse {
    status: string;
    message: string;
}

export interface UnlockVaultCredentials {
    ans1: string;
    ans2: string;
    ans3: string;
    pin: string;
}

export type SetupVaultCredentials = UnlockVaultCredentials;

export interface SetupVaultResponse {
    status: string;
    message: string;
}

export const getVaultStatus = async (): Promise<VaultStatusResponse & { status: number }> => {
    try {
        const response = await api.get<VaultStatusResponse>("/vault/status");

        return {
            ...response.data,
            status: response.status,
        };
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to get vault status";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        throw new Error(errorMessage);
    }
};

export const unlockVault = async (credentials: UnlockVaultCredentials): Promise<VaultUnlockResponse & { statusCode: number }> => {
    try {
        const response = await api.post<VaultUnlockResponse>("/vault/unlock", credentials);

        return {
            ...response.data,
            statusCode: response.status,
        };
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to unlock vault";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }


        throw new Error(errorMessage);
    }
};

export const lockVault = async (): Promise<VaultLockResponse & { statusCode: number }> => {
    try {
        const response = await api.post<VaultLockResponse>("/vault/lock");

        return {
            ...response.data,
            statusCode: response.status,
        };
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to lock vault";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        throw new Error(errorMessage);
    }
};

export const setupVault = async (credentials: SetupVaultCredentials): Promise<SetupVaultResponse & { statusCode: number }> => {
    try {
        const response = await api.post<SetupVaultResponse>("/vault/setup", credentials);

        return {
            ...response.data,
            statusCode: response.status,
        };
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage = "Failed to setup vault";

        if (axiosError?.response?.data) {
            const data = axiosError.response.data;

            if (data && typeof data === "object" && "message" in data) {
                errorMessage = (data as { message: string }).message;
            }
        }

        // Handle 409 Conflict - Vault already initialized
        if (axiosError?.response?.status === 409) {
            errorMessage = "Vault already initialized";
        }

        throw new Error(errorMessage);
    }
};

import { api } from "./api";
import { AxiosError } from "axios"; 

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export interface SignupCredentials {
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorWithMessage(data: any): data is { message: string } {
  return data && typeof data === "object" && "message" in data;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse & { status: number }> => {
  try {
    const response = await api.post<LoginResponse>(
      "v1/auth/login",
      credentials
    );

    return {
      ...response.data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    // console.error("❌ Login error:", error);
    // console.error("❌ Error response:", axiosError?.response);
    // console.error("❌ Error status:", axiosError?.response?.status);
    // console.error("❌ Error data:", axiosError?.response?.data);
    // console.error("❌ Error headers:", axiosError?.response?.headers);
    let errorMessage = "Login failed";

    if (axiosError?.response?.data) {
      const data = axiosError.response.data;

      if (isErrorWithMessage(data)) {
        errorMessage = data.message;
      }
      else if (typeof data === "string" && data.includes("Error:")) {
        const match = data.match(/Error:\s*([^<\n]+)/);
        if (match) {
          errorMessage = match[1].trim();
        }
      }
    }


    if (axiosError?.response?.status === 429) {
      const retryAfter = axiosError?.response?.headers["retry-after"];
      errorMessage = `Too many login attempts. Please try again in ${
        retryAfter || "60"
      } seconds.`;
    }

    throw new Error(errorMessage);
  }
};


export const signup = async (
  credentials: SignupCredentials
): Promise<SignupResponse & { status: number }> => {
  try {
    const response = await api.post<SignupResponse>(
      "v1/auth/signup",
      credentials
    );

    return {
      ...response.data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    // console.error("❌ Signup error:", error);
    // console.error("❌ Error response:", axiosError?.response);
    // console.error("❌ Error status:", axiosError?.response?.status);
    // console.error("❌ Error data:", axiosError?.response?.data);


    let errorMessage = "Signup failed";

    if (axiosError?.response?.data) {
      const data = axiosError.response.data;
      if (isErrorWithMessage(data)) {
        errorMessage = data.message;
      }
      else if (typeof data === "string" && data.includes("Error:")) {
        const match = data.match(/Error:\s*([^<\n]+)/);
        if (match) {
          errorMessage = match[1].trim();
        }
      }
    }


    if (axiosError?.response?.status === 429) {
      const retryAfter = axiosError?.response?.headers["retry-after"];
      errorMessage = `Too many signup attempts. Please try again in ${
        retryAfter || "60"
      } seconds.`;
    }

    throw new Error(errorMessage);
  }
};



export const logout = async (): Promise<void> => {
  try {
    await api.post("v1/auth/logout");
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const axiosError = error as AxiosError;
    throw new Error(axiosError?.message);
    // throw new Error(axiosError?.response?.data?.message || "Logout failed");
  }
};

import { type ReactNode } from "react";

interface FormInputProps {
    icon: ReactNode;
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    endAdornment?: ReactNode;
}

const FormInput = ({
    icon,
    type,
    name,
    placeholder,
    value,
    onChange,
    error,
    endAdornment,
}: FormInputProps) => {
    return (
        <div>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-white/5 focus-within:ring-2 focus-within:ring-emerald-400">
                {icon}
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full outline-none bg-transparent text-text-primary placeholder:text-text-muted"
                />
                {endAdornment}
            </div>
            {error && <p className="text-sm text-error mt-1">{error}</p>}
        </div>
    );
};

export default FormInput;

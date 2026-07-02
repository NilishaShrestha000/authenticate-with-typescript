import { useField } from "formik";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const FormInput = ({ label, type, ...props }: FormInputProps) => {
    const [field, meta] = useField(props as any);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const isPassword = type === "password";

    return (
        <div className="relative mt-5">
            <label htmlFor={props.id || props.name} className="text-xl lg:text-2xl font-medium">
                {label}
            </label>
            <input
                {...props}
                {...field}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-xl lg:text-2xl mt-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-12">
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
            )}

            {meta.touched && meta.error ? (
                <div className="error text-sm text-red-400">{meta.error}</div>
            ) : null}
        </div>
    );
};
export default FormInput;
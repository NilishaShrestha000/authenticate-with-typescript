import { useField } from "formik";
import type { ReactNode } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
    name: string;
}

const Checkbox = ({ children, ...props }: CheckboxProps) => {
    const [field, meta] = useField({ ...props, type: "checkbox" } as any);

    return (
        <>
            <label className="checkbox-input flex items-center gap-2">
                <input type="checkbox" {...props} {...field} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};
export default Checkbox;
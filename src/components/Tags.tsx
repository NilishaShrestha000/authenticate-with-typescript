import { useField } from "formik";

interface TagsProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
}

const Tags = ({ label, ...props }: TagsProps) => {
    const [field, meta] = useField(props as any);

    return (
        <>
            {label && (
                <label htmlFor={props.id || props.name} className="text-xl lg:text-2xl font-medium">
                    {label}
                </label>
            )}
            <input
                {...props}
                {...field}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-xl lg:text-xl mt-2 focus:outline-none focus:ring-1 focus:ring-violet-400"
            />
            {meta.touched && meta.error ? (
                <div className="error text-sm text-red-400">{meta.error}</div>
            ) : null}
        </>
    );
};
export default Tags;
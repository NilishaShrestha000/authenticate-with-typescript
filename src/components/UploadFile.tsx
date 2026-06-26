import { useField } from "formik";
import { MdOutlineFileUpload } from "react-icons/md";
import type { ChangeEvent } from "react";

interface UploadFileProps {
    label: string;
    name: string;
    id?: string;
}

const UploadFile = ({ label, ...props }: UploadFileProps) => {
    const [field, , helpers] = useField<File | null>(props as any);

    return (
        <div className="flex flex-col">
            <label htmlFor={props.id || props.name} className="text-xl lg:text-2xl font-medium flex items-center">
                {label}
            </label>
            <label htmlFor={props.id || props.name} className="flex flex-row gap-3 mt-2">
                {field.value ? (
                    <img
                        src={URL.createObjectURL(field.value)}
                        alt="Preview"
                        className="w-24 h-24 rounded-sm"
                    />
                ) : (
                    <div className="text-gray-400 text-4xl w-24 h-24 border border-gray-300 bg-background justify-center items-center rounded-sm flex">
                        <MdOutlineFileUpload />
                    </div>
                )}
                <div className="flex flex-col gap-1">
                    <span>{field.value ? field.value.name : "Choose file"}</span>
                    <span>{field.value ? "Click to replace?" : "Jpg or Png image"}</span>
                </div>
            </label>

            <input
                id={props.id || props.name}
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                        helpers.setValue(e.target.files[0]);
                    }
                }}
                className="hidden"
            />
        </div>
    );
};
export default UploadFile;
import { useState } from "react";
import Api from "@/Api/api";
import { Formik, Form, FieldArray, type FormikHelpers } from "formik";
import FormInput from "@/components/FormInput";
import Checkbox from "@/components/Checkbox";
import Tags from "@/components/Tags";
import UploadFile from "@/components/UploadFile";
import DeleteService from "@/hooks/Services/DeleteService";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { PostServicesSchema } from "@/validation/authSchema";
import useServices from "./useServices";
import { type SeeServiceFormValues } from "@/typscript/interfaces&types";

const emptyValues: SeeServiceFormValues = {
    title: "",
    shortDescription: "",
    description: "",
    icon: "",
    image: null,
    price: "",
    currency: "",
    isActive: true,
    order: "",
    tags: [{ skills: "" }],
};

const PatchService = () => {
    const { data: services } = useServices();
    const [selectedId, setSelectedId] = useState<string>("");

    const isEditing = selectedId !== "";
    const selectedService = services?.find((s) => s.id === selectedId) ?? null;

    const initialValues: SeeServiceFormValues = selectedService
        ? {
            title: selectedService.title || "",
            shortDescription: selectedService.shortDescription || "",
            description: selectedService.description || "",
            icon: (selectedService as any).icon || "",
            image: null,
            price: String(selectedService.price ?? ""),
            currency: selectedService.currency || "",
            isActive: selectedService.isActive ?? false,
            order:(selectedService as any).order || "",
            tags: selectedService.tags?.length
                ? selectedService.tags.map((t) => ({ skills: t }))
                : [{ skills: "" }],
        }
        : emptyValues;

    const buildFormData = (values: SeeServiceFormValues): FormData => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("shortDescription", values.shortDescription);
        formData.append("description", values.description);
        formData.append("icon", values.icon);
        if (values.image) formData.append("image", values.image);
        formData.append("price", values.price);
        formData.append("currency", values.currency);
        formData.append("isActive", String(values.isActive));
        formData.append("order", values.order);
        values.tags.map((t) => t.skills).forEach((tag) => formData.append("tags[]", tag));
        return formData;
    };

    const { mutate: createService, isPending: isCreating } = useMutation({
        mutationFn: (values: SeeServiceFormValues) => Api.post("/api/services", buildFormData(values)),
        onSuccess: () => toast.success("Service created successfully"),
        onError: (err) => {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message ?? "Failed to create service");
            } else {
                toast.error("Something went wrong");
            }
        },
    });

    const { mutate: updateService, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, values }: { id: string; values: SeeServiceFormValues }) =>
            Api.patch(`/api/services/${id}`, buildFormData(values)),
        onSuccess: () => toast.success("Service updated successfully"),
        onError: (err) => {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message ?? "Failed to update service");
            } else {
                toast.error("Something went wrong");
            }
        },
    });

    const isPending = isCreating || isUpdating;

    const handleSubmit = (
        values: SeeServiceFormValues,
        { resetForm }: FormikHelpers<SeeServiceFormValues>
    ): void => {
        if (isEditing) {
            updateService({ id: selectedId, values }, { onSuccess: () => setSelectedId("") });
        } else {
            createService(values, { onSuccess: () => resetForm() });
        }
    };

    return (
        <div className="border border-gray-500 rounded-2xl px-6 py-5 flex flex-col gap-5">
            <div className="text-center text-2xl lg:text-4xl font-semibold text-orange-400">
                {isEditing ? "Edit Service" : "Upload Service"}
            </div>

            <div>
                <label className="text-sm font-medium text-slate-400 mb-1.5 block">
                    Choose a service to edit, or leave blank to create a new one
                </label>
                <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:border-orange-400 transition-colors"
                >
                    <option value="">+ New service</option>
                    {services?.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.title}
                        </option>
                    ))}
                </select>
            </div>

            <Formik<SeeServiceFormValues>
                key={selectedId}
                enableReinitialize
                initialValues={initialValues}
                validationSchema={PostServicesSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput label="Title" name="title" type="text" placeholder="e.g: Web Development" />
                        <FormInput label="Icon" name="icon" type="text" placeholder="e.g: code, global" />
                    </div>

                    <FormInput
                        label="Short Description"
                        name="shortDescription"
                        type="text"
                        placeholder="One line summary of the service"
                        className="mt-2"
                    />

                    <FormInput
                        label="Description"
                        name="description"
                        type="text"
                        placeholder="Enter Title..."
                        className="mt-2"
                    />

                    <div className="border-b m-2"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <UploadFile label="Image" name="image" />

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                                <FormInput label="Price" name="price" type="number" placeholder="500" />
                                <FormInput label="Currency" name="currency" type="text" placeholder="e.g: NPR,USD" />
                            </div>

                            <FieldArray name="tags">
                                {({ push, remove, form }) => {
                                    const { values } = form as { values: SeeServiceFormValues };
                                    return (
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xl lg:text-2xl font-medium">Tags</label>
                                            {values.tags.map((_tag, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Tags
                                                        name={`tags.${index}.skills`}
                                                        type="text"
                                                        placeholder="e.g: react"
                                                    />
                                                    {values.tags.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                            className="border rounded px-2 py-1 bg-gray-300 hover:bg-gray-400"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="w-fit border rounded px-2 py-1 bg-gray-300 hover:bg-gray-400"
                                                onClick={() => push({ skills: "" })}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    );
                                }}
                            </FieldArray>
                        </div>
                    </div>

                    <div className="border border-b m-5"></div>

                    <Checkbox name="isActive" type="checkbox">
                        Is this service Active?
                    </Checkbox>

                    <div className="flex gap-3 items-center">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="border rounded px-4 py-2 bg-violet-400 hover:bg-violet-500 disabled:opacity-50"
                        >
                            {isPending
                                ? isEditing ? "Saving..." : "Uploading..."
                                : isEditing ? "Save Changes" : "Upload Service"}
                        </button>

                        {isEditing && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setSelectedId("")}
                                    className="border rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    Cancel
                                </button>
                                <DeleteService id={selectedId} />
                            </>
                        )}
                    </div>
                </Form>
            </Formik>

            <ToastContainer />
        </div>
    );
};

export default PatchService;
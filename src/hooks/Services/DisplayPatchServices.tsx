import Api from "@/Api/api";
import { Formik, Form, FieldArray, type FormikHelpers } from "formik";
import FormInput from "@/components/FormInput";
import Checkbox from "@/components/Checkbox";
import Tags from "@/components/Tags";
import UploadFile from "@/components/UploadFile";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DeleteService from "@/hooks/Services/DeleteService";
import axios from "axios";

interface Tag {
    skills: string;
}

interface Service {
    title: string;
    shortDescription: string;
    description: string;
    icon: string;
    price: number;
    currency: string;
    isActive: boolean;
    order: number;
    tags: string[];
}

interface ServiceFormValues {
    title: string;
    shortDescription: string;
    description: string;
    icon: string;
    image: File | null;
    price: string;
    currency: string;
    isActive: boolean;
    order: string;
    tags: Tag[];
}

const PatchServices = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        const fetchService = async (): Promise<void> => {
            try {
                const res = await Api.get<Service>(`/api/services/${id}`);
                setService(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchService();
    }, [id]);

    const handleService = async (
        values: ServiceFormValues,
        { resetForm }: FormikHelpers<ServiceFormValues>
    ): Promise<void> => {
        try {
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

            const res = await Api.patch(`/api/services/${id}`, formData);
            console.log(res.data);
            resetForm();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
            } else {
                console.log(err);
            }
        }
    };

    if (!service) return <div className="p-10 text-gray-400">Loading...</div>;

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-6">
            <Formik<ServiceFormValues>
                enableReinitialize
                initialValues={{
                    title: service.title || "",
                    shortDescription: service.shortDescription || "",
                    description: service.description || "",
                    icon: service.icon || "",
                    image: null,
                    price: service.price ? String(service.price) : "",
                    currency: service.currency || "",
                    isActive: service.isActive ?? true,
                    order: service.order ? String(service.order) : "",
                    tags: service.tags?.map((t) => ({ skills: t })) || [{ skills: "" }],
                }}
                onSubmit={handleService}>

                <Form className="border border-gray-500 rounded-2xl px-6 py-5 flex flex-col gap-5">
                    <div className="text-center text-xl lg:text-2xl font-semibold text-orange-400">
                        Edit Services
                    </div>

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

                    <div className="mt-5">
                        <FormInput
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Enter Title..."
                            className="mt-2"
                        />
                    </div>

                    <div className="border-b m-5"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <UploadFile label="Image" name="image" />

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                                <FormInput label="Price" name="price" type="number" placeholder="500" />
                                <FormInput label="Currency" name="currency" type="text" placeholder="e.g: NPR,USD" />
                            </div>

                            <FieldArray name="tags">
                                {({ push, remove, form }) => {
                                    const { values } = form as { values: ServiceFormValues };
                                    return (
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">Tags</label>
                                            {values.tags.map((_tag: Tag, index: number) => (
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
                                                            className="border rounded px-2 py-1 bg-gray-300 hover:bg-gray-400">
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="w-fit border rounded px-2 py-1 bg-gray-300 hover:bg-gray-400"
                                                onClick={() => push({ skills: "" })}>
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

                    <button type="submit" className="border rounded px-4 py-2 bg-violet-400 hover:bg-violet-500">
                        Save Changes
                    </button>
                </Form>
            </Formik>

            <div className="mt-5">
                {id && <DeleteService id={Number(id)} />}
            </div>
        </div>
    );
};

export default PatchServices;
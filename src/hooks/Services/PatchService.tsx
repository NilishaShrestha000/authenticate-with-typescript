import { useState, useEffect } from "react";
import Api from "@/Api/api";
import { Formik, Form, FieldArray, type FormikHelpers } from "formik";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/Checkbox";
import Tags from "@/components/Tags";
import UploadFile from "@/components/UploadFile";
import { Label } from "@/components/ui/label";
import { FiX } from "react-icons/fi";
import axios from "axios";
import useServices from "./useServices";
import DeleteService from "@/hooks/Services/DeleteService";
import { ToastContainer, toast } from "react-toastify";

interface Tag {
    skills: string;
}

interface Service {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    icon: string;
    price: number | string;
    currency: string;
    isActive: boolean;
    order: string;
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

const PatchService = () => {
    const { data } = useServices();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        if (!editingId) {
            setService(null);
            return;
        }
        const fetchService = async (): Promise<void> => {
            try {
                const res = await Api.get(`/api/services/${editingId}`);
                setService(res.data);
            } catch (err) {
                console.log(err);
                toast.error("Failed to load services");
            }
        };
        fetchService();
    }, [editingId]);

    const closeEdit = (): void => setEditingId(null);

    const handleService = async (
        values: ServiceFormValues,
        _helpers: FormikHelpers<ServiceFormValues>
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

            const res = await Api.patch(`/api/services/${editingId}`, formData);
            toast.success("Servie updated Successfully");
            console.log(res.data);
            closeEdit();

        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data);
                toast.error("Failed to update service");
            } else {
                console.error(err);
                toast.error("Something wentt wrong");
            }
        }
    };

    return (
        <div className="border border-gray-400 dark:border-gray-700 rounded-2xl bg-white/5 overflow-hidden">
            <ToastContainer />
            <div className="px-6 py-5 text-center text-2xl lg:text-4xl font-semibold text-orange-400">
                Manage Services
            </div>

            <table className="w-full text-xl lg:text-2xl">
                <thead>
                    <tr className="border-b border-gray-400 dark:border-gray-700 text-left">
                        <th className="px-4 py-3 text-slate-500 uppercase tracking-widest">Title</th>
                        <th className="px-4 py-3 text-slate-500 uppercase tracking-widest">Price</th>
                        <th className="px-4 py-3 text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="px-4 py-3 text-slate-500 uppercase tracking-widest">Tags</th>
                        <th className="px-4 py-3 text-slate-500 uppercase tracking-widest">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((s) => (
                        <tr key={s.id} className="border-b border-gray-400/30 dark:border-gray-700/50 hover:bg-violet-400/5 transition-colors">
                            <td className="px-4 py-3 font-medium">{s.title}</td>
                            <td className="px-4 py-3 text-slate-400">{s.price} {s.currency}</td>
                            <td className="px-4 py-3">
                                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${s.isActive ? "text-green-400" : "text-slate-500"}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${s.isActive ? "bg-green-400" : "bg-slate-500"}`} />
                                    {s.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-slate-400">
                                <div className="flex flex-wrap gap-1">
                                    {s.tags?.map((tag: string) => (
                                        <span key={tag} className="px-2 py-0.5 rounded-md bg-violet-400/10 text-violet-400 text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingId(s.id)}
                                    className="flex items-center gap-2 text-sm border border-gray-600 hover:border-violet-400 hover:text-violet-400 px-3 py-1.5 rounded-lg transition-all duration-200">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {editingId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={(e) => { if (e.target === e.currentTarget) closeEdit(); }}>
                    <div className="bg-background border border-gray-700 rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-orange-400">Edit Service</h2>
                            <button
                                onClick={closeEdit}
                                className="text-slate-400 hover:text-foreground transition-colors p-1 rounded-lg hover:bg-white/10">
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        {!service ? (
                            <div className="p-10 text-gray-400">Loading...</div>
                        ) : (
                            <Formik<ServiceFormValues>
                                enableReinitialize
                                initialValues={{
                                    title: service.title || "",
                                    shortDescription: service.shortDescription || "",
                                    description: service.description || "",
                                    icon: service.icon || "",
                                    image: null,
                                    price: String(service.price ?? ""),
                                    currency: service.currency || "",
                                    isActive: service.isActive ?? false,
                                    order: service.order || "",
                                    tags: service.tags?.map((t) => ({ skills: t })) || [{ skills: "" }],
                                }}
                                onSubmit={handleService
                                }>

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
                                                    const { values } = form as { values: ServiceFormValues };
                                                    return (
                                                        <div className="flex flex-col gap-2">
                                                            <Label>Tags</Label>
                                                            {values.tags.map((_tag: Tag, index: number) => (
                                                                <div key={index} className="flex items-center gap-2">
                                                                    <Tags
                                                                        name={`tags.${index}.skills`}
                                                                        type="text"
                                                                        placeholder="e.g: react"
                                                                    />
                                                                    {values.tags.length > 1 && (
                                                                        <Button type="button" onClick={() => remove(index)}>
                                                                            Remove
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                            <Button type="button" className="w-fit" onClick={() => push({ skills: "" })}>
                                                                Add
                                                            </Button>
                                                        </div>
                                                    );
                                                }}
                                            </FieldArray>
                                        </div>
                                    </div>

                                    <div className="border-b m-2"></div>

                                    <Checkbox name="isActive" type="checkbox">
                                        Is this service Active?
                                    </Checkbox>

                                    <Button type="submit">Save Changes</Button>
                                </Form>
                            </Formik>
                        )}

                        <div className="mt-4">
                            {editingId !== null && <DeleteService id={editingId} />}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PatchService;
export interface Profile {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
}

export type Profiles = Profile[]


export interface ProfileUpdateValues {
    fullName: string;
    email: string;
    phone: string;
}

export interface FormState {
    fullName: string;
    email: string;
    phone: string;
}

export interface DeleteUserProps {
    id: string;
}

export interface ChangePasswordValues {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface AddService {
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

export interface SeeServiceFormValues {
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
import * as Yup from "yup";

export const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .matches(/[a-z]/, "Must contain at least 1 small letter.")
        .matches(/[A-Z]/, "Must contain at least 1 capital letter.")
        .matches(/[0-9]/, "Must contain at least 1 number.")
        .required("Required"),
    rememberMe: Yup.boolean().notRequired(),
});

export const RegisterSchema = Yup.object({
    fullName: Yup.string()
        .min(6, "Must be at least 6 characters")
        .matches(/^[A-Za-z\s]+$/, "Names cannot contain numbers or special characters.")
        .required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    phone: Yup.string()
        .matches(/^9[0-9]{9}$/, "Numbers must start from 9 and have 10 digits.")
        .required("Required"),
    password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .matches(/[a-z]/, "Must contain at least 1 small letter.")
        .matches(/[A-Z]/, "Must contain at least 1 capital letter.")
        .matches(/[0-9]/, "Must contain at least 1 number.")
        .required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match.")
        .required("Required"),
});

export const ForgotSchema = Yup.object({
    email: Yup.string().email("Enter valid email").required("Required"),
});

export const ResetSchema = Yup.object({
    newPassword: Yup.string()
        .min(8, "Must be at least 8 characters")
        .matches(/[a-z]/, "Must contain at least 1 small letter.")
        .matches(/[A-Z]/, "Must contain at least 1 capital letter.")
        .matches(/[0-9]/, "Must contain at least 1 number.")
        .required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Confirm Password must match New Password.")
        .required("Required"),
});

export const ContactUs = Yup.object({
    name: Yup.string().min(2, "Name must be at least 2 characters").required("Required"),
    email: Yup.string().email("Enter valid email address").required("Required"),
    phone: Yup.string()
        .matches(/^[0-9]{7,15}$/, "Phone must be 7-15 digits with no letters or special characters")
        .required("Required"),
    subject: Yup.string().min(3, "Subject must be at least 3 characters").required("Required"),
    message: Yup.string().min(10, "Message must be at least 10 characters").required("Required"),
});


export const PostServicesSchema = Yup.object({
    title: Yup.string()
        .min(3, "Must be longer than or equal to 3 characters")
        .required("Required"),
    shortDescription: Yup.string()
        .min(10, "Must be longer than or equal to 10 characters")
        .required("Required"),
    description: Yup.string()
        .min(10, "Must be longer than or equal to 10 characters")
        .required("Required"),
    icon: Yup.string()
        .required("Required"),
    price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be in greater than 0")
        .required("Required"),
    currency: Yup.string()
        .required("Required"),
    isActive: Yup.boolean()
        .required("Required"),
    tags: Yup.array()
        .required("Required")
})


export const ChangePsswordSchema = Yup.object({
    currentPassword: Yup.string()
        .required("Current password is required"),
    newPassword: Yup.string()
        .min(8, "Must be at least 8 characters")
        .matches(/[a-z]/, "Must contain at least 1 small letter.")
        .matches(/[A-Z]/, "Must contain at least 1 capital letter.")
        .matches(/[0-9]/, "Must contain at least 1 number.")
        .required("Required"),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Confirm Password must match New Password.")
        .required("Required"),
});
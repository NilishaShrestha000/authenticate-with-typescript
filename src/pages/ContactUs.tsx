import { Formik, Form } from "formik";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import { GrPhone, GrMapLocation } from "react-icons/gr";
import { BiLogoGmail } from "react-icons/bi";
import FormInput from "@/components/FormInput";
import usePostContact from "@/hooks/Contact/usePostContact";
import { ToastContainer, toast } from "react-toastify";
import { ContactUs as ContactSchema } from "@/validation/authSchema";

const style = {
    wrapper: "px-7 py-5 lg:px-13 lg:py-10 min-h-full w-full",
    text: "text-sm lg:text-md text-orange-400 font-semibold tracking-wide",
    header: "text-3xl lg:text-5xl font-medium tracking-wide mt-5",
    paragraph: "text-sm lg:text-md text-slate-400 mt-2",
    border: "flex border border-orange-400/10 bg-orange-400/5 rounded-lg px-5 py-10 justify-between  w-full lg:w-2/3  ",
};

interface ContactFormValues {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const ContactUs = () => {
    const { submit } = usePostContact();

    const handleSubmit = async (
        values: ContactFormValues,
        { resetForm }: { resetForm: () => void }
    ): Promise<void> => {
        try {
            await submit(values);
            toast.success("Message sent successfully.");
            resetForm();
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={style.wrapper}>
            <ToastContainer />

            <div className={style.text}>GET IN TOUCH</div>
            <div className={style.header}>Contact Us</div>
            <div className={style.paragraph}>
                Have a project in mind? We would love to hear about it. Fill in the form and we will get back to you as soon as possible.
            </div>

            <div className="items-center justify-center flex mt-10 px-10 md:px-30">
                <div className={style.border}>
                    <div className="flex flex-col lg:flex-row justify-between gap-15 w-full">
                        <div className="flex flex-col w-full lg:w-1/2">
                            <div className="p-3 rounded-lg bg-orange-300/15 ">
                                <div className="flex items-center gap-2 px-2">
                                    <div className="bg-red-400/15 rounded-md items-center p-2"><GrPhone /></div>
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <a href="https://wa.me/9779863034097" target="_blank" rel="noreferrer">+977 9860000000</a>
                                    </div>
                                </div>

                                <div className="border border-b m-3"></div>

                                <div className="flex items-center gap-2 px-2">
                                    <div className="bg-red-400/15 rounded-md items-center p-2"><BiLogoGmail /></div>
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <div>yenya@mail.com</div>
                                    </div>
                                </div>

                                <div className="border border-b m-3"></div>

                                <div className="flex items-center gap-2 px-2">
                                    <div className="bg-red-400/15 rounded-md items-center p-2"><GrMapLocation /></div>
                                    <div>
                                        <p className="text-sm text-gray-600">Location</p>
                                        <a href="https://www.google.com/maps/place/YenyaSoft+Private+Limited" target="_blank" rel="noreferrer">Sanepa, Lalitpur</a>
                                    </div>
                                </div>
                            </div>

                            <div className="border mt-3 bg-white/5 px-2 py-1 flex items-center gap-2 rounded-md">
                                <div className="rounded-full bg-green-700 h-2 w-2"></div>
                                <div className="text-sm text-gray-700 font-semibold">Available Mon-Fri, 9AM - 6PM</div>
                            </div>

                            <div className="flex flex-col mt-3">
                                <div className="text-sm text-gray-600">Find us on</div>
                                <div className="flex flex-row gap-2 text-lg mb-5 text-gray-500">
                                    <a href="https://github.com/NilishaShrestha000/Authentication-System" target="_blank" rel="noreferrer" className="border p-2 rounded-lg"><FaGithub /></a>
                                    <a href="https://wa.me/9779863034097" target="_blank" rel="noreferrer" className="border p-2 rounded-lg"><FaWhatsapp /></a>
                                    <a href="https://www.linkedin.com/company/yenya-soft-private-limited/posts/?feedView=all" target="_blank" rel="noreferrer" className="border p-2 rounded-lg"><FaLinkedin /></a>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full lg:w-1/2">
                            <p className="justify-center font-semibold text-orange-400 flex">Fill in the form</p>
                            <Formik<ContactFormValues>
                                initialValues={{ name: "", email: "", phone: "", subject: "", message: "" }}
                                validationSchema={ContactSchema}
                                onSubmit={handleSubmit}>
                                <Form className="w-full">
                                    <FormInput label="Name" name="name" type="text" placeholder="Enter your Name" />
                                    <FormInput label="Email Address" name="email" type="email" placeholder="Enter your Email Address" className="mt-2" />
                                    <FormInput label="Phone Number" name="phone" type="text" placeholder="Enter your Phone Number" className="mt-2" />
                                    <FormInput label="Subject" name="subject" type="text" />
                                    <FormInput label="Message" name="message" placeholder="Write why you want to contact us" />
                                    <button type="submit" className="mt-2 w-full border rounded px-4 py-2 hover:bg-orange-600 bg-orange-400">Send</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ContactUs;
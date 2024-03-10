import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must contain at least 8 characters" })
                    .regex(/^(?=.*[A-Z])(?=.*[0-9])/i, { message: "Password must contain at least one uppercase letter and one number" })
});


export default function SignUp() {
    const { signup } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({ resolver: zodResolver(schema) });
    const [ profile, setProfile ] = useState({ name: "", email: "", password: "", image: null });

    const handleInputChange = (e) => {
        if (e.target.name === 'image') {
            setProfile({
                ...profile,
                image: e.target.files[0]
            });
        } else {
            setProfile({
                ...profile,
                [e.target.name]: e.target.value
            });
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("file", profile.image);
            const userData = await signup(formData);
        } catch (error) {
            setError("root", { message: "signup failed try again" })
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-full">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex justify-center mb-6">
                    <label htmlFor="image" className="avatar-upload flex items-center justify-center w-24 h-24 rounded-full border-2 border-gray-300 cursor-pointer overflow-hidden">
                        {profile.image ? (
                            <img src={URL.createObjectURL(profile.image)} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M10 0a7 7 0 100 14 7 7 0 000-14zm0 15A5 5 0 1010 5a5 5 0 000 10z" clipRule="evenodd" />
                            </svg>
                        )}
                        <input type="file" id="image" name="image" accept="image/*" onChange={handleInputChange} className="hidden" />
                    </label>
                </div>
                <h2 className="text-2xl font-semibold text-center mb-4">Create a new account</h2>
                <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700 text-sm font-semibold mb-2">Full Name *</label>
                        <input type="text" id="fullName" name="name" {...register('name')} className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"/>
                        {errors.name && <p className='text-red-500 font-medium text-center pt-1'>{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                        <input type="email" {...register('email')} className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"/>
                        {errors.email && <p className='text-red-500 font-medium text-center pt-1'>{errors.email.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                        <input type="password"  {...register('password')} className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"/>
                        {errors.password && <p className='text-red-500 font-medium text-center pt-1'>{errors.password.message}</p>}
                    </div>
                    <button disabled={isSubmitting} type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-800">{isSubmitting ? "loading..." : "Register"}</button>
                    {errors.root && <p className='text-red-500 font-medium text-center pb-2'>{errors.root.message}</p>}
                </form>

                <p className="text-gray-600 text-xs text-center mt-4">
                    By clicking Register, you agree to accept Apex Financial's
                    <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a>.
                </p>
                <Link to="/login">
                    <button className="mt-2 text-blue-700 hover:text-blue-500 font-medium capitalize duration-200"> you have an account ?</button>
                </Link>
            </div>
            <ToastContainer />
        </div>
    );
}

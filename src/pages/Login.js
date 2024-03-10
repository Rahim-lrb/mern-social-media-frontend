import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../contexts/authContext';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must contain at least 8 character(s)"})
})


const Loading = () => {
    return (
      <div className="flex items-center justify-center">
        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c1.225 0 2.416-.28 3.485-.779l3.364 2.971A8.003 8.003 0 0112 20zm7-8a7.963 7.963 0 01-2 5.291l3 2.647A11.953 11.953 0 0024 12h-4z"></path>
        </svg>
        <span className="text-white">Loading...</span>
      </div>
    );
  };


export default function Login() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({resolver: zodResolver(schema) });
    const { currentUser, login, getCurrentUser } = useContext(UserContext);

    const onSubmit = async(data) => {
        console.log(data.email, data.password)
        try {
            // async code
            const userData = await login({ email: data.email, password: data.password });
            console.log(userData.data)
            if (userData.data) {
                await getCurrentUser();
            }
            // throw new Error()
            console.log(data);
        } catch(err) {
            setError("root", { message: "login in failed try again" })
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <Card></Card>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">


                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                        <input type="email" id="email" name="email" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" {...register('email')}/>
                        {errors.email && <p className='text-red-500 font-medium text-center pt-1'>{errors.email.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                        <input type="password" id="password" name="password" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" {...register('password')}/>
                        {errors.password && <p className='text-red-500 font-medium text-center pt-1'>{errors.password.message}</p>}
                    </div>
                    <button disabled={isSubmitting} type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-800">{isSubmitting ? <Loading></Loading> : "login"}</button>
                    {errors.root && <p className='text-red-500 font-medium text-center '>{errors.root.message}</p>}
                </form>


                <Link to="/signup">
                    <button className="mt-2 text-blue-700 hover:text-blue-500 font-medium capitalize duration-200"> you don't have an account ?</button>
                </Link>
                <ToastContainer />
            </div>
        </div>
    );
}

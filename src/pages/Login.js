import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../contexts/authContext';
import { Link } from 'react-router-dom';
import Card from '../components/Card';


export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { currentUser, login, getCurrentUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email: formData.email, password: formData.password });
      if (userData.data) {
        await getCurrentUser();
        toast.success("login successfully");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || 'Login failed', { position: "top-right", autoClose: 5000 });
    }
  };


  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <Card></Card>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Login</button>
        </form>
        <Link to="/signup">
          <button className="mt-2 text-blue-700 hover:text-blue-500 font-medium capitalize duration-200"> you don't have an account ?</button>
        </Link>
        <ToastContainer />
      </div>
    </div>
  );
}

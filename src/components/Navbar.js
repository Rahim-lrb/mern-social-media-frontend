import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/authContext';

export default function Navbar() {
  const { currentUser, logout } = useContext(UserContext);
  const handleLogout = async () => {
    await logout();
  };
  return (
    <nav className="relative md:px-20 sm:px-8 px-4 py-4 flex justify-between items-center bg-white">
      <Link to="/" className="capitalize text-2xl sm:text-3xl font-bold leading-none">wex</Link>

      <div>
        {currentUser ? (
          <div className="flex items-center">
            <Link to="/profile">
              <div className="flex items-center cursor-pointer mr-1">
                <img className="w-11 h-11 object-cover rounded-full shadow cursor-pointer" alt="User avatar" src={`${currentUser?.image}`} />
                <p className="ml-3 font-semibold">{currentUser.name}</p>
              </div>
            </Link>

            <button onClick={handleLogout} className="inline-block py-2 px-6 bg-gray-50 hover:bg-gray-100 text-md text-gray-900 font-bold rounded-xl transition duration-200 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="inline-block py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200 mr-2">Login</Link>
            <Link to="/signup" className="inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">Sign Up</Link>
          </>
        )}
      </div>

    </nav>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import axios from "axios"

const NavBar = () => {
  const { setUser, search, setSearch } = useAuth();

  const handleLogout = async(e) => {
    e.preventDefault();
    try{
      await axios.post('http://localhost:4000/users/logout',null,{withCredentials:true});
      setUser(null);
    }
    catch(err)
    {
      console.log(err);
    }
  };

  return (
    <nav className="w-full px-6 py-4 bg-white border-b border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition w-[20%] text-center">
        Snippex
      </Link>

      <input
        type="text"
        placeholder="Search snippets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-[40%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <Link
          to="/create"
          className="px-4 py-2 rounded-md bg-gray-200 text-black hover:bg-gray-300 transition"
        >
          Create
        </Link>
        <Link
          to="/yourCodes"
          className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        >
          Your Snippets
        </Link>
        <Link
          to="/profile"
          className="px-4 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition"
        >
          Profile
        </Link>
        <button
          onClick={(e) => handleLogout(e)}
          className="px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

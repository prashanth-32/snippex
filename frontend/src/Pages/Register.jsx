import React, { useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

export default function Register() {
  const [isRegister, setIsRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const { user, setUser } = useAuth();
  const [redirect, setRedirect] = useState(false);


  useEffect(()=>{
    const getData = async () =>{
      const {data} = await axios.get("https://snippex.onrender.com/users/info",{withCredentials:true});
      setUser(data.info);
    }
    getData();
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      try{
        const {data} = await axios.post("https://snippex.onrender.com/users/register", { username, email, password }, { withCredentials: true });
        setUser(data.data);
        setRedirect(true);
      }
      catch(error)
      {
        const message = error.response?.data?.message;
        alert(message);
      }
    }
    else {
      try{
      const {data} = await axios.post("https://snippex.onrender.com/users/login", { username, password }, { withCredentials: true });
      setUser(data.data);
      setRedirect(true);
      }
      catch(error)
      {
        const message = error.response?.data?.message;
        alert(message);
      }
    }
  };

  if (redirect || user)
    return <Navigate to={'/'} />

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-800 to-gray-900 flex items-center justify-center">
      <div className="w-full h-full flex flex-col justify-center items-center px-6">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-10 shadow-xl">
          <h2 className="text-4xl font-bold text-center text-white mb-10">
            {isRegister ? 'Register' : 'Login'}
          </h2>

          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {isRegister && (
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
            >
              {isRegister ? 'Register' : 'Login'}
            </button>
          </form>

          <p className="text-center text-sm text-white/80 mt-6">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              className="text-indigo-300 hover:text-indigo-500 font-medium cursor-pointer"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Login here' : 'Register here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

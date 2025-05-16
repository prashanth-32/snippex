import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { user,setUser } = useAuth();
  const handleLogout = async(e) => {
    e.preventDefault();
    try{
      await axios.post('https://snippex.onrender.com/users/logout',null,{withCredentials:true});
      setUser(null);
    }
    catch(err)
    {
      console.log(err);
    }
  };
  return (
    <div className="h-[70vh] bg-gray-50 flex items-center justify-center py-5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">User Profile</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">Username:</span>
            <span className="text-gray-800 font-semibold">{user.username}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">Email:</span>
            <span className="text-gray-800 font-semibold">{user.email}</span>
          </div>
          <div className="flex justify-around">
            <button className="rounded-md bg-black text-white font-semibold p-2 mt-5" ><Link to={'/yourCodes'}>Your snippets</Link></button>
            <button className="rounded-md bg-black text-white font-semibold p-2 mt-5 cursor-pointer" onClick={(e)=>handleLogout(e)}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

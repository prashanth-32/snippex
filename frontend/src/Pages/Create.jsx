import { useState } from "react"
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import useAuth from "../Hooks/useAuth"

const Create = () => {
   const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [code,setCode]=useState("")
    const {user}=useAuth();
    const [language,setLanguage] = useState("");
    const [redirect,setRedirect] = useState(false);

    const handleCreate = async (e)=>{
        e.preventDefault();
        try{
          const res = await axios.post('https://snippex.onrender.com/snippets/create',{author:user.username,name:title,language:language,description:desc,code:code},{withCredentials:true});
          // console.log(res);
          setRedirect(true);
        }
        catch(err)
        {
          console.log("Message while creating a snippet",err);
        }
    }
    if(redirect)
      return <Navigate to={'/'}/>
  return (
     <div className="w-full min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
  <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8">
    <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-8">
      ✨ Create a Snippet
    </h1>

    <form className="flex flex-col gap-6">
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter snippet name"
        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        placeholder="Programming language (e.g., JavaScript, Python)"
        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        rows={10}
        onChange={(e) => setCode(e.target.value)}
        value={code}
        placeholder="Paste your snippet here..."
        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      />

      <textarea
        rows={6}
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        placeholder="Description of the snippet..."
        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      />

      <button
        type="button"
        onClick={handleCreate}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition-all duration-200 cursor-pointer"
      >
        ➕ Add Snippet
      </button>
    </form>
  </div>
</div>

  )
}

export default Create
import { useEffect, useState } from "react";
import Code from "./Code";
import axios from "axios";
import { Link, Navigate } from "react-router-dom"
import useAuth from "../Hooks/useAuth";
import Pagination from "./Pagination";

const Home = () => {
  const [snippets, setSnippets] = useState([]);
  const { search, setSearch } = useAuth();
  const [page,setPage] = useState(1);
  // slice(st,end) end => will not consider till end i.e. till end - 1 inclusive;
  let startIndex = (page - 1) * 5;
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/snippets/', { withCredentials: true });
        setSnippets(data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [search]);

  const newSnippets = snippets.slice(startIndex,startIndex + 5);
  return (
    <div className="flex flex-col">
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12">
        <div className="max-w-5xl mx-auto mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Explore Snippets</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Browse useful code snippets shared by developers around the world.
          </p>
        </div>

        {/* Snippets List */}
        {snippets.length === 0 && <div>No snippets yet</div>}
        <div className="flex flex-col gap-6 items-center max-w-4xl mx-auto">
          {newSnippets.filter((x) => {
            return x.name.toLowerCase().includes(search.toLowerCase())
          })
            .map((ele) => {
              return <Link className="w-full" to={`/snippet/${ele._id}`} key={ele._id}><Code ele={ele} key={ele._id} /></Link>
            })}
        </div>
      </div>
      <Pagination totalSnippets = {snippets.length} setPage = {setPage} page={page}/>
    </div>
  );
};

export default Home;

import React, { useEffect ,useState} from 'react'
import useAuth from '../Hooks/useAuth'
import axios from "axios"
import { Link } from 'react-router-dom'
import Code from './Code'

const YourCodes = () => {
  const { user ,search} = useAuth();
  const [snippets, setSnippets] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://snippex.onrender.com/snippets/user/${user.username}`, { withCredentials: true });
        setSnippets(data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [search]);
  return (
    <div>
      {snippets.length === 0 && <div>No snippets yet</div>}
      <div className="flex flex-col gap-6 items-center max-w-4xl mx-auto">
        {snippets.filter((x) => 
        {
          return x.name.toLowerCase().includes(search.toLowerCase())
        })
        .map((ele) => {
          return <Link className="w-full" to={`/snippet/${ele._id}`} key={ele._id}><Code ele={ele} key={ele._id}/></Link>
        })}
      </div>
    </div>
  )
}

export default YourCodes
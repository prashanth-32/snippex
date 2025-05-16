import { createContext , useState} from "react"

export const userContext = createContext(null);


const UsercontextProvider = ({children}) => {
    const [user,setUser] = useState();
    const [search,setSearch] = useState('');
    return (
      <userContext.Provider value={{user,setUser,search,setSearch}}>
        {children}
      </userContext.Provider>
    )
}

export default UsercontextProvider
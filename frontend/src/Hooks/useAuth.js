import { userContext } from "../Pages/UsercontextProvider";
import { useContext } from "react";

const useAuth = () =>{
    return useContext(userContext);
}

export default useAuth;
import useAuth from '../Hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from "./NavBar.jsx"; 

const ProtectedRoutes = () => {
  const {user} = useAuth();
  if(user)
  {
    return (
      <>
        <NavBar/>
        <Outlet/>
      </>
    )
  }
  return (
    <Navigate to={'/login'}/>
  )

}

export default ProtectedRoutes
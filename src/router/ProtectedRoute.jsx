import React, { useEffect } from "react";
import useUser from "../features/Authentication/useUser";
import { Navigate, useNavigate } from "react-router-dom";
import FullPage from "../ui/FullPage";
import Spinner from "../ui/Spinner";

function ProtectedRoute({ children }) {
    const navigate=useNavigate()
    const { user, isLoading, isAuthenticated } = useUser();

    useEffect(()=>{
        if(!isAuthenticated && !isLoading){
            navigate('/login')
        }
    },[navigate,isLoading,isAuthenticated])

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return children;
}

export default ProtectedRoute;

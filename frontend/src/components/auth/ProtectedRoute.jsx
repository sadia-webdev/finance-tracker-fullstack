import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../lib/store/AuthStore";
import api from "../../lib/api/apiClient";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { setAuth, user, clearAuth, token } = useAuthStore();

  const location = useLocation();


  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      clearAuth();
    }
  }, [clearAuth, isError, error]);

  useEffect(() => {
    if ((isSuccess, data)) {
      setAuth(token, data);
    }
  }, [isSuccess, token, setAuth, data]);

   if (isLoading) {
     return (
       <div className='flex h-screen items-center justify-center'>
         <Loader className='animate-spin' />
       </div>
     );
   }

   if (isError) {
     console.log("error here", error);
     return <Navigate to='/login' state={{ from: location }} replace />;
   }

   if (!user) {
     console.log("user not found", user);
     return <Navigate to='/login' state={{ from: location }} replace />;
   }

  return children;
};

export default ProtectedRoute;

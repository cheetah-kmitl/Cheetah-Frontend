import { useSession } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  const { isLoaded, isSignedIn } = useSession();

  if (!isLoaded) return;

  if (!isSignedIn)
    return <Navigate to="/auth" />;


  return <Outlet />;
}

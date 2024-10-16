import axios from "axios";
import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";
import { LoadingAnimation } from "../components/LoadingAnimation";

const apiServerURL = import.meta.env.VITE_API_SERVER_URL; 

export const RootLayout = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await axios.get(`${apiServerURL}/api/session/status`, { withCredentials: true });        
        if (!response.data.is_init) {
          throw new Error();
        }
      }
      catch {
        setTimeout(() => {
          window.location.href = `${apiServerURL}/api/session/register`;
        }, 2000);

        setIsError(true);
      }
      finally {
        setIsLoading(false);
      }
    } 
    
    checkSession();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <Logo size={32} />
        <LoadingAnimation />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen grid place-items-center">
        <i>Session expired trying register again...</i>
      </div>
    );
  }

  return children;
}

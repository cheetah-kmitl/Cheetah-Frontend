import { useState } from "react";
import { SigninForm } from "../components/SigninForm";
import { SignupForm } from "../components/SignupForm";
import CheetahLogo from "/cheetah-logo.png"
import { useSession } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const signUpPanelMessage = "Don't have account ?";
const signInPanelMessage = "Already have account ?";

export const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const clerkSession = useSession();

  if (!clerkSession.isLoaded) return;

  if (clerkSession.isSignedIn) {
    return <Navigate replace to={"/dashboard"} />
  }

  return (
    <div className="flex justify-center items-center bg-zinc-200 h-full">
      <section className="relative grid grid-cols-2 bg-white h-[560px] w-[960px] mx-4 rounded-2xl">
        <SigninForm />
        <SignupForm />

        {/* Cover panel */}
        <div
          style={{
            transform: `translate(${isSignIn ? 0 : -100}%, 0px)`,
            borderRadius: `${isSignIn ? "0 16px 16px 0" : "16px 0 0 16px"}` 
          }}
          className="h-full w-1/2 flex flex-col justify-center items-center bg-zinc-300 absolute right-0 transition-transform duration-300"
        >
          <img
            src={CheetahLogo}
            alt="logo"
            className="h-14 absolute top-4 right-4"
          />
          <h1 className="text-4xl font-bold">
            Welcome !
          </h1>
          <p className="text-base">
            { isSignIn ? signUpPanelMessage : signInPanelMessage }
          </p>
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-lg text-zinc-600 border border-zinc-600 px-10 py-2 mt-6 rounded-lg hover:border-2 hover:font-bold"
          >
            { isSignIn ? "Sign up" : "Sign in" }
          </button>
        </div>

      </section>
    </div>
  );
}

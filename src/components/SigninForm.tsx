import { useState } from "react";
import { TextInput } from "./TextInput";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";

export const SigninForm = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const navigate = useNavigate();
  const clerkSignIn = useSignIn();

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!emailAddress || !password) {
      setErrorMsg("Please fill all inputs");
      return;
    }

    setErrorMsg("");
    if (!clerkSignIn.isLoaded) return;

    try {
      setIsSigningIn(true);
      const signInAttempt = await clerkSignIn.signIn?.create({
        identifier: emailAddress,
        password: password
      });

      if (signInAttempt.status === "complete") {
        await clerkSignIn.setActive({ session: clerkSignIn.signIn.createdSessionId });
        navigate("/dashboard");
      }
    }
    catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrorMsg(err.errors[0].message);
      }
    }
    finally {
      setIsSigningIn(false);
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col gap-3 px-16 justify-center items-center"
    >
      <h1 className="text-5xl font-extrabold mb-6">
        Sign in
      </h1>
      <TextInput
        onType={(text) => setEmailAddress(text)}
        placeHolder="Enter your email or username"
      />
      <TextInput
        onType={(text) => setPassword(text)}
        placeHolder="Enter your password"
        isPasswordInput={true}
        watchable={true}
      />
      { errorMsg.length !== 0 &&
        <p className="text-red-600 text-sm">
          { errorMsg }
        </p>
      }
      <button
        type="submit"
        className={`${ isSigningIn ? "bg-zinc-500" : "bg-zinc-600" } text-white text-xl w-full rounded-lg mt-2 py-2`}
      >
        { isSigningIn ? "Loading..." : "Sign in" }
      </button>
    </form>
  );
}

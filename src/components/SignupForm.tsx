import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/shared/error";

import { TextInput } from "./TextInput";

export const SignupForm = () => {  
  // For sign in phase
  const [username, setUsername] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  // For verify phase
  const [code, setCode] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  

  const [isSignupPhase, setIsSignupPhase] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const clerkSignUp = useSignUp();
  const navigate = useNavigate();

  async function onSignInFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username || !emailAddress || !password || !confirmPassword) {
      setErrorMsg("Please fill all inputs");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Password does not match");
      return;
    }

    if (!clerkSignUp.isLoaded) return;
    
    try {
      setIsSigningUp(true);
      await clerkSignUp.signUp.create({ username, emailAddress, password });
      await clerkSignUp.signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setIsSignupPhase(false);
    }
    catch (err) {
      if (isClerkAPIResponseError(err)) {
        console.log(err.errors);
        setErrorMsg(err.errors[0].message);
      }
    }
    finally {
      setIsSigningUp(false);
    }
  };

  async function onVerifySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!clerkSignUp.isLoaded) return;

    try {
      setIsVerifying(true);
      const signUpAttempt = await clerkSignUp.signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === "complete") {
        await clerkSignUp.setActive({ session: signUpAttempt.createdSessionId });
        navigate("/dashboard");
      }
    }
    catch (err) {
      if (isClerkAPIResponseError(err)) {
        console.error(err.errors[0].message);
      }
    }
    finally {
      setIsVerifying(false);
    }
  };

  return (
    isSignupPhase ? 
      <form
        onSubmit={onSignInFormSubmit}
        className="flex flex-col gap-4 px-16 justify-center items-center"
      >
        <h1 className="text-5xl font-extrabold mb-6">
          Sign up
        </h1>
        <TextInput
          onType={(text) => setUsername(text)}
          placeHolder="Enter your username"
        />
        <TextInput
          onType={(text) => setEmailAddress(text)}
          placeHolder="Enter your email"
        />
        <TextInput
          onType={(text) => setPassword(text)}
          placeHolder="Enter your password"
          isPasswordInput={true}
          watchable={true}
        />
        <TextInput 
          onType={(text) => setConfirmPassword(text)}
          placeHolder="Re-enter your password"
          isPasswordInput={true}
        />
        { errorMsg.length !== 0 &&
          <p className="text-red-600 text-sm">
            { errorMsg }
          </p>
        }
        <button
          type="submit"
          className={`${ isSigningUp ? "bg-zinc-500" : "bg-zinc-600" } text-white text-xl w-full rounded-lg mt-2 py-2`}
        >
          { isSigningUp ? "Loading..." : "Sign up" }
        </button>
      </form>
    :
      <form
      onSubmit={onVerifySubmit}
      className="flex flex-col gap-4 px-16 justify-center items-center"
      >
        <h1 className="text-5xl font-extrabold mb-4">
          Sign Up
        </h1>
        <p>
          Verify code has been sent into your email
        </p>
        <TextInput
          onType={(text) => setCode(text)}
          placeHolder="Enter your verify code"
        />
        <button
          type="submit"
          className={`${ isVerifying ? "bg-zinc-500" : "bg-zinc-600" } text-white text-xl w-full rounded-lg mt-2 py-2`}
        >
          { isVerifying ? "Loading..." : "Verify" }
        </button>
      </form>
  );
}
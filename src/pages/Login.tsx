import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  return (
    <div className="my-5">
      <h3>Sign in with Google to continue</h3>
      <button className="btn btn-primary my-4" onClick={signInWithGoogle}>
        Sign in with google
      </button>
    </div>
  );
};

export default Login;

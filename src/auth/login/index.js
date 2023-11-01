import React, { useState } from "react";
import "./login.css";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsj, setErrorMsj] = useState("");

  const handleAuthenticateUser = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.message;
      setErrorMsj(errorMessage);
    }
  };
  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form>
        <div className="formInputs">
          <label>Email</label>
          <input
            className="inputEmail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formInputs">
          <label>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleAuthenticateUser} className="login-btn">
          Login
        </button>
        <span>{errorMsj}</span>
      </form>
    </div>
  );
};

export default Login;
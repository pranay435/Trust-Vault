import React, { useState } from "react";
import emaillogo from "../../assets/email.png";
import passwordlogo from "../../assets/password.png";
import usernamelogo from "../../assets/username.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const signupAPI = async () => {
    try {
      if (password === repass) {
        const res = await axios.post(
          "https://trustvault-api.vercel.app/auth/signup",
          {
            username: username,
            email: email,
            password: password,
          }
        );
        const { message, token } = res.data;
        sessionStorage.setItem("jwt", token);
        navigate("/getAllVaults");
      } else {
        alert("Password Mismatched");
      }
    } catch (error) {
      if (error.response) {
        setIsError(error.response.data.error);
      }
    }
  };

  return (
    <div data-testid="signup" className="signup-box">
      <h1>SignUp</h1>
      <form action="" className="signup-form">
        <div>
          <img src={usernamelogo} alt="" />
          <input
            type="text"
            placeholder="Username"
            className="username-inp"
            value={username}
            onChange={(event) => {
              setusername(event.target.value);
            }}
          />
        </div>
        <div>
          <img src={emaillogo} alt="" />
          <input
            type="email"
            placeholder="Enter Email"
            className="email-inp"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <img src={passwordlogo} alt="" />
          <input
            type="password"
            placeholder="Enter Password"
            className="pass-inp"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <img src={passwordlogo} alt="" />
          <input
            type="password"
            placeholder="Enter Password Again"
            className="pass-inp"
            value={repass}
            onChange={(event) => {
              setRepass(event.target.value);
            }}
          />
        </div>
        {isError && <div className="AuthError2">{isError}</div>}
        <button
          className="signup-inp"
          onClick={(event) => {
            event.preventDefault();
            signupAPI();
          }}
          disabled={!username || !email || !password || !repass}
          style={
            !username || !email || !password || !repass
              ? { cursor: "not-allowed" }
              : { cursor: "pointer" }
          }
        >
          SignUp
        </button>
      </form>
      <h2 className="flipbuttlog">
        Already have an account?
        <span
          data-testid="cardrTest2"
          className="cardr"
          onClick={() => {
            console.log("clicked from signupcard");
            props.flip();
          }}
        >
          SignIn
        </span>
      </h2>
    </div>
  );
}

export default SignUp;

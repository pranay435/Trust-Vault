import React, { useState } from "react";
import axios from "axios";

function LoginCardStatusCheck() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState("");
  const [message, setMessage] = useState("");

  const statusCheck = async () => {
    setError("");
    setMessage("");
    try {
      const res = await axios.post(
        "https://trustvault-api.vercel.app/cron/statusCheck",
        {
          email: email,
          password: password,
        }
      );
      setMessage(res.data.message);
    } catch (error) {
      if (error.response) setError(error.response.data.error);
    }
  };

  return (
    <div data-testid="logCardStatusCheck" className="otpcard">
      <h2 className="otpcardheading">Status Check With Login</h2>
      {isError !== "" ? (
        <p data-testid="afterClick" className="error">
          {isError}
        </p>
      ) : (
        <></>
      )}
      {message !== "" ? (
        <p data-testid="afterClick" className="message">
          {message}
        </p>
      ) : (
        <></>
      )}

      <input
        name="email"
        type="email"
        placeholder="Enter Email"
        className="otpemail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        className="otpemail"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        className="sendotp"
        onClick={(event) => {
          event.preventDefault();
          statusCheck();
        }}
        disabled={!email || !password}
        style={!email || !password ? { cursor: "not-allowed" } : {}}
      >
        Check Status
      </button>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
}

export default LoginCardStatusCheck;

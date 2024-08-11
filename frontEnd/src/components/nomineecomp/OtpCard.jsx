import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OtpCard() {
  const urlParams = new URLSearchParams(window.location.search);
  const v_id = urlParams.get("v_id");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const verifyEmail = async () => {
    // console.log(email);
    try {
      const res = await axios.post(
        "https://trustvault-api.vercel.app/nominee/email",
        {
          email: email,
        }
      );
      const { token, message } = res.data;
      // console.log(token);
      if (token) {
        sessionStorage.setItem("jwt", token);
        setError("");
        setMessage(message);
        setClicked(true);
        setEmail("");
      } else {
        setError("Something Went Wrong!!Try again later");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(error.response.data.error);
      }
    }
  };

  const verifyOtp = async () => {
    try {
      // console.log(otp);
      // console.log(v_id);
      const token = sessionStorage.getItem("jwt");
      const res = await axios.post(
        "https://trustvault-api.vercel.app/nominee/otpverify",
        {
          otp: otp,
          v_id: v_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );

      const { message, description } = res.data;
      setMessage(message);
      console.log(description);
      navigate(`/nominee/vault?v_id=${v_id}`, { state: description });
      setOtp("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("");
        setError(error.response.data.error);
      }
    }
  };
  return (
    <div className="otpcard">
      <h2 className="otpcardheading">
        {!clicked ? "Verify Your Mail" : "Verify Your OTP"}
      </h2>
      <input
        role="input"
        name={!clicked ? "email" : "otp"}
        type={!clicked ? "email" : "text"}
        placeholder={!clicked ? "Enter Email" : "Enter OTP"}
        className="otpemail"
        value={!clicked ? email : otp}
        onChange={(event) =>
          !clicked ? setEmail(event.target.value) : setOtp(event.target.value)
        }
      />
      {error !== "" && <div className="error2">{error}</div>}
      {message !== "" && <div style={{ color: "green" }}>{message}</div>}
      <button
        className="sendotp"
        onClick={(event) => {
          event.preventDefault();
          !clicked ? verifyEmail() : verifyOtp();
        }}
        disabled={!clicked ? !email : !otp}
      >
        {!clicked ? "Send OTP" : "Verify OTP"}
      </button>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
}

export default OtpCard;

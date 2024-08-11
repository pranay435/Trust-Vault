import React, { useState } from "react";
import profileLogo from "../../assets/icons8-male-user-96.png";
import { useNavigate } from "react-router-dom";

function Profileicon() {
  const [ishover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      data-testid="profile"
      className="profile"
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <img src={profileLogo} alt="profileLogo" />
      {ishover ? (
        <div className="dropdownmenutwo">
          <div>Profile</div>
          <div
            onClick={() => {
              sessionStorage.removeItem("jwt");
              navigate("/");
            }}
          >
            LogOut
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profileicon;

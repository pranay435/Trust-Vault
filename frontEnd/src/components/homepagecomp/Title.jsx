import React from "react";
import logo from "../../assets/vault-svgrepo-com.svg";

function Title() {
  return (
    <div data-testid="title" className="title">
      <div className="titleimg">
        <img src={logo} alt="logo" />
      </div>
      <h1>TrustVault</h1>
    </div>
  );
}

export default Title;

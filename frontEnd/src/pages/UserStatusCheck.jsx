import React from "react";
import Header from "../components/nomineecomp/Header";
import LoginCardStatusCheck from "../components/userstatuscheckcomp/LoginCardStatusCheck";
import "../pages/UserStatusCheck.css";

function UserStatusCheck() {
  return (
    <div className="page2">
      <Header />
      <LoginCardStatusCheck />
    </div>
  );
}

export default UserStatusCheck;

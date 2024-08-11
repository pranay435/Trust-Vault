import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/nomineecomp/Header";
import VaultDesKeyCard from "../components/nomineecomp/VaultDesKeycard";
import "../pages/VaultDataForNom.css";

function VaultDataForNom() {
  const urlParams = new URLSearchParams(window.location.search);
  const v_id = urlParams.get("v_id");
  const location = useLocation();
  console.log(location);

  return (
    <div className="page2">
      <Header />
      <VaultDesKeyCard description={`${location.state}`} v_id={v_id} />
    </div>
  );
}

export default VaultDataForNom;

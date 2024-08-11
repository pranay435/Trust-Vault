import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/nomineecomp/Header";
import Vaultcard from "../components/getallvaultscomp/Vaultcard";
import "./GetAllVaults.css";
import addbutton from "../assets/plus.png";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/getallvaultscomp/PopUp";

function GetAllVaults() {
  const [vaults, setVaults] = useState([]);
  const [isClick, setClick] = useState("");
  const [targetVId, setTargetVId] = useState();
  const navigate = useNavigate();

  const fetchmyapi = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await axios.get(
      "https://trustvault-api.vercel.app/vault/getAllVaults",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setVaults(res.data.filterData);
    // console.log(res.data.filterData);
  };

  useEffect(() => {
    fetchmyapi();
  }, []);

  return (
    <div>
      <div className="page3">
        <Header />
        <div className="vaultHolder">
          {vaults.map((each, index) => {
            return (
              <Vaultcard
                key={index}
                ind={index + 1}
                content={each.v_name}
                nomineenames={each.n_name}
                v_id={each.v_id}
                setClick={setClick}
                setTargetVId={setTargetVId}
              />
            );
          })}
          <div
            data-testid="addVault"
            className="vaultcard add"
            onClick={() => {
              navigate("/addVault");
            }}
          >
            <img src={addbutton} alt="" />
          </div>
        </div>
      </div>
      {isClick !== "" ? (
        <PopUp type={isClick} setClick={setClick} v_id={targetVId} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default GetAllVaults;

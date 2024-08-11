import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DisResContext from "../displayvaultcomp/DisResContext";

function PopUp(props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispRes1, setDispRes } = useContext(DisResContext);
  const token = sessionStorage.getItem("jwt");

  const displayVaultfunc = async () => {
    try {
      const res = await axios.post(
        "https://trustvault-api.vercel.app/vault/displayVault",
        {
          vId: props.v_id,
          vaultSecretKey: password,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      setDispRes(res.data);
      // console.log(dispRes1);
      navigate("/displayVault");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      }
    }
  };

  const deleteVault = async () => {
    try {
      const res = await axios.delete(
        `https://trustvault-api.vercel.app/vault/deleteVault/${props.v_id}`,
        {
          headers: {
            Authorization: token,
          },
          data: {
            password: password,
          },
        }
      );
      console.log(res.data.message);
      if (res.data.message === "Succefully Vault Is Deleted") {
        props.setClick("");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div className="deletepopup">
      <div className="content">
        <h1>Enter Password</h1>
        <input
          type="password"
          className="deletepassword"
          placeholder={
            props.type === "Delete"
              ? "Enter Login Password"
              : "Enter Vault Secret Key"
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div data-testid="errorDiv" style={{ color: "red" }}>
          {error}
        </div>
        <div className="buttons">
          <button
            data-testid="funcButton"
            className={props.type === "Delete" ? "delete" : "display"}
            onClick={() =>
              props.type === "Delete" ? deleteVault() : displayVaultfunc()
            }
            disabled={!password}
          >
            {props.type}
          </button>
          <button
            data-testid="cancelButton"
            className="cancel"
            onClick={() => props.setClick("")}
          >
            Cancel
          </button>
        </div>
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
    </div>
  );
}

export default PopUp;

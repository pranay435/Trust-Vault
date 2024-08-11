import React, { useState } from "react";
import "./AddVault.css";
import Header from "../components/nomineecomp/Header";
import deletelogo from "../assets/icons8-delete.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddVault() {
  const [nomDetails, setnomDetails] = useState([
    { n_name: "", n_email: "", n_ph_no: "" },
  ]);
  const [v_name, setvname] = useState("");
  const [data, setdata] = useState("");
  const [vsk, setvsk] = useState("");
  const [desc, setdesc] = useState("");
  const disability =
    nomDetails.filter((each) => !each.n_email || !each.n_name || !each.n_ph_no)
      .length ||
    !v_name ||
    !data ||
    !vsk ||
    !desc;
  const navigate = useNavigate();

  function deletenominee(index) {
    if (nomDetails.length === 1) {
      alert("Atleast One Nominee is required for a vault");
    } else {
      const list = [...nomDetails];
      list.splice(index, 1);
      setnomDetails(list);
    }
  }

  function handleNomineeChangeDetails(event, index, tag) {
    const update = event.target.value;
    const list = [...nomDetails];
    list[index][tag] = update;
    setnomDetails(list);
  }

  const addVaultAPI = async () => {
    const token = sessionStorage.getItem("jwt");
    // console.log(token);
    const res = await axios.post(
      "https://trustvault-api.vercel.app/vault/addVault",
      {
        v_name: v_name,
        data: data,
        nomineeDetails: nomDetails,
        vaultSecretKey: vsk,
        description: desc,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    alert(res.data.message);
    navigate("/getAllVaults");
  };

  return (
    <div className="page4">
      <Header />
      <div className="addvaultsection">
        <div className="buttonsforaddvault">
          <button
            className="addva"
            onClick={() => {
              addVaultAPI();
            }}
            disabled={disability}
          >
            Add Vault
          </button>
          <button
            className="cancelva"
            onClick={() => {
              navigate("/getAllVaults");
            }}
          >
            Cancel
          </button>
        </div>
        <div className="sec vname">
          <h2>Vault Name</h2>
          <input
            type="text"
            placeholder="Enter Vault Name"
            value={v_name}
            onChange={(event) => {
              setvname(event.target.value);
            }}
          />
        </div>
        <div className="sec data">
          <h2>Data</h2>
          <textarea
            type="text"
            placeholder="Enter Your Data Here"
            // contentEditable
            value={data}
            onChange={(event) => {
              setdata(event.target.value);
            }}
          ></textarea>
        </div>
        <h2 className="nomdetailsheading">Nominee Details</h2>
        <div>
          {nomDetails.map((each, index) => {
            return (
              <div
                key={index}
                data-testid="nomineedetails"
                className="nomineedetails"
              >
                <h2>Nominee {index + 1}</h2>
                <input
                  className="nom"
                  type="text"
                  placeholder="Enter Name"
                  value={each.n_name}
                  onChange={(event) => {
                    handleNomineeChangeDetails(event, index, "n_name");
                  }}
                />
                <input
                  className="nom"
                  type="email"
                  placeholder="Enter Mail"
                  value={each.n_email}
                  onChange={(event) => {
                    handleNomineeChangeDetails(event, index, "n_email");
                  }}
                />
                <input
                  className="nom"
                  type="text"
                  placeholder="Enter Number"
                  value={each.n_ph_no}
                  onChange={(event) => {
                    handleNomineeChangeDetails(event, index, "n_ph_no");
                  }}
                />
                <img
                  data-testid="deleteNominee"
                  onClick={() => {
                    deletenominee(index);
                  }}
                  src={deletelogo}
                  alt=""
                />
              </div>
            );
          })}
          <div
            className="addnomineebutton"
            onClick={() => {
              setnomDetails([
                ...nomDetails,
                { n_name: "", n_email: "", n_ph_no: "" },
              ]);
            }}
          >
            <b>+</b> Add Nominee
          </div>
        </div>
        <div className="sec vsk">
          <h2>Vault Secret Key</h2>
          <input
            type="text"
            placeholder="Enter Vault Secret Key"
            value={vsk}
            onChange={(event) => {
              setvsk(event.target.value);
            }}
          />
        </div>
        <div className="sec desc">
          <h2>Description</h2>
          <textarea
            type="text"
            placeholder="Describe about the Vault Secret Key so that nominee can guess it by reading this description"
            value={desc}
            onChange={(event) => {
              setdesc(event.target.value);
            }}
          ></textarea>
        </div>
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
    </div>
  );
}

export default AddVault;

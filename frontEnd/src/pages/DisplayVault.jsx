import React, { useState } from "react";
import "./AddVault.css";
import deletelogo from "../assets/icons8-delete.svg";
import Header from "../components/nomineecomp/Header";
import DisResContext from "../components/displayvaultcomp/DisResContext";
import { useContext } from "react";
import axios from "axios";

function DisplayVault() {
  const { dispRes1, fetchedvaultorg } = useContext(DisResContext);
  // Now dispRes is a copy of dispRes1 not reference
  const [dispRes, fetchedvault] = useState(
    JSON.parse(JSON.stringify(dispRes1))
  );
  const [updatecheck, setUpdateCheck] = useState(false);

  function setvname(val, name) {
    fetchedvault({ ...dispRes, [name]: val });
  }

  function addnominee() {
    let nomDetails = dispRes.nominee;
    nomDetails.push({ n_name: "", n_email: "", n_ph_no: "" });
    fetchedvault({ ...dispRes, nominee: nomDetails });
  }

  function deletenominee(index) {
    let nomDetails = dispRes.nominee;
    if (nomDetails.length === 1) {
      alert("Atleast One Nominee is required for a vault");
    } else {
      const list = [...nomDetails];
      list.splice(index, 1);
      fetchedvault({ ...dispRes, nominee: list });
    }
  }

  function handleNomineeChangeDetails(event, index, tag) {
    let nomDetails = dispRes.nominee;
    const update = event.target.value;
    let list = [...nomDetails];
    list[index][tag] = update;
    fetchedvault({ ...dispRes, nominee: list });
  }

  const fetchupdatevaultapi = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await axios.put(
      `https://trustvault-api.vercel.app/vault/updateVault/${dispRes.v_id}`,
      dispRes,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data.message);
  };

  let nomDisability = dispRes.nominee.filter(
    (nom) => !nom.n_name || !nom.n_email || !nom.n_ph_no
  ).length;
  const diability =
    !dispRes.vaultSecretKey ||
    !dispRes.v_name ||
    !dispRes.data ||
    !dispRes.description ||
    nomDisability;

  return (
    <div className="page4">
      <Header />
      <div className="addvaultsection">
        <div className="buttonsforaddvault">
          {!updatecheck ? (
            <button
              className="addva"
              onClick={() => {
                setUpdateCheck(true);
              }}
            >
              Edit Vault
            </button>
          ) : (
            <button
              className="addva"
              onClick={() => {
                fetchupdatevaultapi();
                fetchedvaultorg(JSON.parse(JSON.stringify(dispRes)));
                setUpdateCheck(false);
              }}
              disabled={diability}
            >
              Save Changes
            </button>
          )}
          {updatecheck && (
            <button
              className="cancelva"
              onClick={() => {
                fetchedvault(JSON.parse(JSON.stringify(dispRes1)));
                setUpdateCheck(false);
              }}
            >
              Cancel
            </button>
          )}
        </div>
        <div className="sec vname">
          <h2>Vault Name</h2>
          {!updatecheck ? (
            <input data-testid="vName" value={dispRes1.v_name} readOnly />
          ) : (
            <input
              type="text"
              placeholder="Enter Vault Name"
              value={dispRes.v_name}
              onChange={(event) => {
                setvname(event.target.value, "v_name");
              }}
            />
          )}
        </div>
        <div className="sec data">
          <h2>Data</h2>
          {!updatecheck ? (
            <textarea value={dispRes1.data} readOnly></textarea>
          ) : (
            <textarea
              type="text"
              placeholder="Enter Your Data Here"
              value={dispRes.data}
              onChange={(event) => {
                setvname(event.target.value, "data");
              }}
            ></textarea>
          )}
        </div>
        <h2 className="nomdetailsheading">Nominee Details</h2>
        {!updatecheck ? (
          <div>
            {dispRes1.nominee.map((each, index) => {
              return (
                <div key={index} className="nomineedetails">
                  <h2>Nominee {index + 1}</h2>
                  <input
                    data-testid="nName"
                    className="nom"
                    value={each.n_name}
                    readOnly
                  />
                  <input
                    data-testid="nEmail"
                    className="nom"
                    value={each.n_email}
                    readOnly
                  />
                  <input
                    data-testid="nPhNo"
                    className="nom"
                    value={each.n_ph_no}
                    readOnly
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {dispRes.nominee.map((each, index) => {
              return (
                <div key={index} className="nomineedetails">
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
                    data-testid="delete"
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
                addnominee();
              }}
            >
              <b>+</b> Add Nominee
            </div>
          </div>
        )}
        {updatecheck && (
          <div className="sec vsk">
            <h2>Vault Secret Key</h2>
            <input
              type="text"
              placeholder="Enter Vault Secret Key"
              onChange={(event) => {
                setvname(event.target.value, "vaultSecretKey");
              }}
            />
          </div>
        )}
        {!updatecheck ? (
          <div className="sec desc">
            <h2>Description</h2>
            <textarea value={dispRes1.description} readOnly></textarea>
          </div>
        ) : (
          <div className="sec desc">
            <h2>Description</h2>
            <textarea
              type="text"
              placeholder="Describe about the Vault Secret Key so that nominee can guess it by reading this description"
              value={dispRes.description}
              onChange={(event) => {
                setvname(event.target.value, "description");
              }}
            ></textarea>
          </div>
        )}
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
    </div>
  );
}

export default DisplayVault;

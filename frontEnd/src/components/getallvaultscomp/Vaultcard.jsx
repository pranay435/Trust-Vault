import React, { useState } from "react";
import vaultlogo from "../../assets/vault.png";
import usernamelogo from "../../assets/username.png";
import deletelogo from "../../assets/icons8-delete.svg";
import DropDownItem from "./DropDownItem";

function Vaultcard(props) {
  const [ishovered, setHovered] = useState(false);
  let vnamecalss = "vaultname";

  if (props.ind % 3 === 1) {
    vnamecalss = "vaultname one";
  } else if (props.ind % 3 === 2) {
    vnamecalss = "vaultname two";
  } else {
    vnamecalss = "vaultname three";
  }

  return (
    <div className="holder">
      <div
        data-testid="vaultcard2"
        className="vaultcard2"
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          data-testid="vaultcard"
          className="vaultcard"
          onClick={() => {
            props.setClick("Display");
            props.setTargetVId(props.v_id);
          }}
        >
          <img src={vaultlogo} alt="" />
        </div>
        <span
          data-testid="vaultname"
          className={vnamecalss}
          onClick={() => {
            props.setClick("Display");
            props.setTargetVId(props.v_id);
          }}
        >
          {props.content}
        </span>
        {ishovered ? (
          <div className="dropdownmenu">
            <ul>
              <DropDownItem
                key="0"
                image={usernamelogo}
                content="Nominees"
                n_name={props.nomineenames}
              />
              <DropDownItem
                key="1"
                image={deletelogo}
                content="Delete"
                v_id={props.v_id}
                setClick={props.setClick}
                setTargetVId={props.setTargetVId}
              />
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Vaultcard;

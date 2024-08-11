import React, { useState } from "react";

function DropDownItem(props) {
  const [ishover, setHover] = useState(false);
  const nominee = props.n_name;

  return (
    <div
      data-testid="dropDownItem"
      className="item"
      onMouseOver={() => {
        if (props.content === "Nominees") {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        if (props.content === "Nominees") {
          setHover(false);
        }
      }}
      onClick={() => {
        if (props.content === "Delete") {
          props.setTargetVId(props.v_id);
          props.setClick("Delete");
        }
      }}
    >
      <img src={props.image} alt="" />
      <p>{props.content}</p>
      {ishover ? (
        <div className="nominees">
          {nominee.map((each, index) => {
            if (index + 1 === nominee.length) {
              return (
                <div data-testid="nominee" key={index}>
                  {each.n_name}
                </div>
              );
            }
            return (
              <div data-testid="nominee" key={index}>
                {each.n_name + ","}
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DropDownItem;

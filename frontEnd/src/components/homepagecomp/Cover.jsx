import React from "react";
import coverlogo from "../../assets/Data_security_28.jpg";

function Cover() {
  return (
    <div data-testid="cover" className="coverimg">
      <img src={coverlogo} alt="coverlogo" />
    </div>
  );
}

export default Cover;

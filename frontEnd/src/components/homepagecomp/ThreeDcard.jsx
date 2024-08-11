import React, { useState } from "react";
import Login from "./Logincard";
import SignUp from "./SignupCard";

function ThreeDcard() {
  const [cardclass, setCardclass] = useState("card");

  function flipper() {
    if (cardclass === "card") {
      setCardclass("card is-flipped");
    } else {
      setCardclass("card");
    }
  }

  return (
    <div data-testid="ThreeDcard" className={cardclass}>
      <Login flip={flipper} />
      <SignUp flip={flipper} />
    </div>
  );
}

export default ThreeDcard;

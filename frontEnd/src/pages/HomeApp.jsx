import React, { useEffect } from "react";
import Title from "../components/homepagecomp/Title";
import Cover from "../components/homepagecomp/Cover";
import Caption from "../components/homepagecomp/Caption";
import ThreeDcard from "../components/homepagecomp/ThreeDcard";
import Design from "../components/homepagecomp/Desgin";
import "./HomeApp.css";
import { useNavigate } from "react-router-dom";

function HomeApp() {
  //No need of div here

  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      navigate("/getAllVaults");
    }
  }, []);

  return (
    <div className="page">
      <Title />
      <div className="pagepart1">
        <div className="covercap">
          <Cover />
          <Caption />
        </div>
        <div className="losi">
          <ThreeDcard />
        </div>
      </div>
      <div>
        <Design />
      </div>
    </div>
  );
}

export default HomeApp;

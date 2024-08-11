import React from "react";
import HomeApp from "./pages/HomeApp";
import { Route, Routes } from "react-router-dom";
import OtpSentForNom from "./pages/OtpSentForNom";
import VaultDataForNom from "./pages/VaultDataForNom";
import UserStatusCheck from "./pages/UserStatusCheck";
import GetAllVaults from "./pages/GetAllVaults";
import AddVault from "./pages/AddVault";
import DisplayVault from "./pages/DisplayVault";
import { DisResProvider } from "./components/displayvaultcomp/DisResContext";

function App() {
  return (
    <DisResProvider>
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/user/statuscheck" element={<UserStatusCheck />} />
        <Route path="/getAllVaults" element={<GetAllVaults />} />
        <Route path="/displayVault" element={<DisplayVault />} />
        <Route path="/addVault" element={<AddVault />} />
        <Route path="/nominee/otp" element={<OtpSentForNom />} />
        <Route path="/nominee/vault" element={<VaultDataForNom />} />
      </Routes>
    </DisResProvider>
  );
}

export default App;

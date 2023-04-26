import React from "react";
import Classes from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <div className={Classes["navbar-container"]}>
      <div>
        <h1 className={Classes.test}>Exchanger</h1>
      </div>
      <div className={Classes["navbar-buttons_container"]}>
        <button>EUR-USD Details</button>
        <button>EUR-GBP Details</button>
      </div>
    </div>
  );
};

export { Navbar };

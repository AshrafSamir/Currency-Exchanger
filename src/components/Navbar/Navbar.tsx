import React from "react";
import Classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className={Classes["navbar-container"]}>
      <div>
        <h1 className={Classes.test}>Exchanger</h1>
      </div>
      <div className={Classes["navbar-buttons_container"]}>
        <Link to="/details" state={{ from: "EUR", to: "USD", amount: 1 }}>
          <button>EUR-USD Details</button>
        </Link>
        <Link to="/details" state={{ from: "EUR", to: "GBP", amount: 1 }}>
          <button>EUR-GBP Details</button>
        </Link>
      </div>
    </div>
  );
};

export { Navbar };

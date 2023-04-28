import "./App.css";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;

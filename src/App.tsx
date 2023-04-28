import "./App.css";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useSelector } from "react-redux";
import Currency from "./models/currency";

import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  const { loading, error } = useSelector((state: { currency: Currency }) => {
    return state.currency;
  });
  return (
    <div className="app-container">
      <Navbar />
      {loading && <p className="api-status">Loading...</p>}
      {error && <p className="api-status">{error}</p>}
      <Outlet />
    </div>
  );
}

export default App;

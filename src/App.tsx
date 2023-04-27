import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Navbar />
        <Home />
      </div>
    </Provider>
  );
}

export default App;

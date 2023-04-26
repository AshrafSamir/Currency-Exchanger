import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Navbar } from "./components/Navbar";
import { ConverterPanel } from "./components/ConverterPanel";
import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Navbar />
        <ConverterPanel />
      </div>
    </Provider>
  );
}

export default App;

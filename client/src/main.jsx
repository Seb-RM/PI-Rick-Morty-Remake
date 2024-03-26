// import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";

import App from "./App";
// import store from "./redux/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </Provider>
);

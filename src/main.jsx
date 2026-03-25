import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'

import "./assets/scss/all.scss";

import App from "./App.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import store from "./stroe/stroe.js";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

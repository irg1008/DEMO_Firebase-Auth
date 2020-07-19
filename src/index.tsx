import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// Router Provider
import { BrowserRouter as RouterProvider } from "react-router-dom";

// Style.
import "./index.css";

// All providers.
import ProvidersWrapper from "./context/ProvidersWrapper";

// App.
import App from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider>
      <ProvidersWrapper>
        <App />
      </ProvidersWrapper>
    </RouterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

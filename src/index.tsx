import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// Style
import "./index.css";

// Firebase
import { FirebaseProvider } from "./components/firebase";

// Loading
import { LoadingProvider } from "./components/loading";

// Auth
import { AuthProvider } from "./components/auth";

// App
import App from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <AuthProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </AuthProvider>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

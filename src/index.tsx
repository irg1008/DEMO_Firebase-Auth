import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// Style
import "./index.css";

// Firebase
import Firebase, { FirebaseContext } from "./utils/firebase";

// App
import App from "./components/app/App";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

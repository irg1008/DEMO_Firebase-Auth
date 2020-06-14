import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// Style
import "./style/index.css";

// Firebase
import Firebase, { FirebaseContext } from "./components/Firebase";

// App
import App from "./app/App";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

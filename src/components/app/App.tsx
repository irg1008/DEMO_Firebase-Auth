import React, { useLayoutEffect } from "react";

// Firebase consumer.
import { useFirebase } from "../../context/firebase";

// FloatingMessage
import FloatingMessage from "../../context/floating_message";

// Loading component
import Loading, { useLoading } from "../../context/loading";

// Navigation
import { Navigation } from "../navigation";

// Routes
import ProtectedRoutes from "../../routes";

/**
 * App class.
 *
 * @class App
 * @extends {Component<IAppProps>}
 */
const App: React.FC = () => {
  // Firebase
  const { authHasLoaded } = useFirebase().state;

  // Loading
  const changeLoad = useLoading().dispatch;

  /**
   * On component mount start oading and check for user signed.
   *
   * @memberof App
   */
  useLayoutEffect(() => {
    // Start loading
    changeLoad({ type: "SHOW_LOAD" });

    if (authHasLoaded) {
      // Hide loading message.
      changeLoad({ type: "HIDE_LOAD" });
    }
  }, [authHasLoaded, changeLoad]);

  /**
   * Render app.
   *
   * @returns
   * @memberof App
   */

  return (
    <>
      {/* Loading overlay */}
      <Loading />
      {/* Load rest of app when auth has loaded */}
      {authHasLoaded && (
        <>
          {/* Floating message shown for user info all over the app */}
          <FloatingMessage />
          {/* Navigation */}
          <Navigation />
          {/* Routes */}
          <ProtectedRoutes />
        </>
      )}
    </>
  );
};

// App uploads the user when mounted. May be a problem to access it on other components componentDidMount function.
export default App;

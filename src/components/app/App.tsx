import React, { useLayoutEffect } from "react";

// Firebase consumer.
import { useFirebase } from "../../context/firebase";

// FloatingMessage component.
import FloatingMessage from "../../context/floating_message";

// Loading component and context.
import Loading, { useLoading } from "../../context/loading";

// Navigation.
import { Navigation } from "../navigation";

// Routes to render.
import ProtectedRoutes from "../../routes";

/**
 * Main component.
 *
 * @returns
 */
const App: React.FC = () => {
  // FirebaseContext.
  // We are waiting for firebase to check if auth ha sloaded on the provider.
  const { authHasLoaded } = useFirebase().state;

  // LoadingContext => Dispatch function to change loading state.
  const appLoad = useLoading().dispatch;

  // On component mounted => Set app on loading state until firebase returns API fetch is successful.
  // VALUES:
  // - authHasLoaded: Check for auth load changes.
  // - appLoad: Uses appLoad dispatch.
  // NOTE: Difference between useLayoutEffect and useEffect hooks is well explained in URL below but mainly the difference is that the first is called before the screen is updated. We use it in this case to prevent screen flashing before showing the load component.
  // - URL: https://daveceddia.com/useeffect-vs-uselayouteffect/
  useLayoutEffect(() => {
    // Start loading app.
    appLoad({ type: "SHOW_LOAD" });

    if (authHasLoaded) {
      // Hide loading message.
      appLoad({ type: "HIDE_LOAD" });
    }
  }, [authHasLoaded, appLoad]);

  return (
    <>
      {/* Loading overlay. */}
      <Loading />
      {/* If auth has loaded => Show app. */}
      {authHasLoaded && (
        <>
          {/* Floating message. */}
          <FloatingMessage />
          {/* Navigation. */}
          <Navigation />
          {/* Routes. */}
          <ProtectedRoutes />
        </>
      )}
    </>
  );
};

export default App;

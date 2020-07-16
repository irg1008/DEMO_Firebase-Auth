import React, { useLayoutEffect } from "react";

// Firebase consumer.
import { useFirebase } from "../../context/firebase";

// FloatingMessage consumer.
import FloatingMessage from "../../context/floating_message";

// Loading component and context.
import Loading, { useLoading } from "../../context/loading";

// Navigation.
import { Navigation } from "../navigation";

// Routes.
import ProtectedRoutes from "../../routes";

/**
 * App class.
 *
 * @returns
 */
const App: React.FC = () => {
  // FirebaseContext => authHasLoaded value.
  // We are waiting for firebase to check auth change on the provider.
  const { authHasLoaded } = useFirebase().state;

  // LoadingContext => Dispatch function to change the state with reducer.
  const appLoad = useLoading().dispatch;

  // On component mounted => Set app on loading state until firebase returns API fetch is successful.
  // VALUES:
  // - authHasLoaded: Check for auth load changes.
  // - appLoad: Uses appLoad dispatch.
  // NOTE: Difference between useLayoutEffect and useEffect hooks is well explained in URL passed but mainly the difference is that the first is called before the screen is updated. We use it in this case to prevent screen flashing before setting the load component to show.
  // - URL: https://daveceddia.com/useeffect-vs-uselayouteffect/
  useLayoutEffect(() => {
    // Start loading app.
    appLoad({ type: "SHOW_LOAD" });

    // If auth has loaded on firebase context.
    if (authHasLoaded) {
      // Hide loading message.
      appLoad({ type: "HIDE_LOAD" });
    }
  }, [authHasLoaded, appLoad]);


  // RETURN ZONE.
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

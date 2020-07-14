import React, { useLayoutEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";

// Const routes
import { routesArray } from "../../routes";

// Firebase consumer.
import Firebase, { withFirebase } from "../firebase";

// Navigation
import { Navigation } from "../navigation";

// Loading component
import Loading, { withLoading } from "../loading";

// Authentication
import { withAuth } from "../auth";

// FloatingMessage
import FloatingMessage from "../floating_message";

// Types of app props.
type IAppProps = {
  /**
   * Firebase of firebase condumer.
   *
   * @type {Firebase}
   */
  firebase: Firebase;

  /**
   * Auth context consumer.
   *
   * @type {*}
   */
  authContext: {
    /**
     * Set user of context.
     *
     * @type {*}
     */
    setUser: any;

    /**
     * Set auth state.
     *
     * @type {*}
     */
    setAuthIsLoaded: any;
  };

  /**
   * The loading context consumer, used to change loading data.
   *
   * @type {*}
   */
  loadingContext: {
    /**
     * Show loading.
     *
     * @type {*}
     */
    showLoading: any;

    /**
     * Hide loading.
     *
     * @type {*}
     */
    hideLoading: any;

    /**
     * App loading.
     *
     * @type {boolean}
     */
    loading: boolean;
  };
};

/**
 * App component.
 *
 * @param {IAppProps} {
 *   firebase,
 *   loadingContext,
 *   authContext,
 * }
 * @returns
 */
const App: React.FC<IAppProps> = ({
  firebase,
  loadingContext,
  authContext,
}: IAppProps) => {
  /**
   * Load app.
   *
   */
  const loadApp = useCallback(() => {
    // Start loading
    loadingContext.showLoading();

    // We recheck the user on app mount. Like reload or redirects. The user is check on log in and sign out.
    firebase.auth.onAuthStateChanged((user: any) => {
      // Set user of auth context only if verified.
      if (user && user.emailVerified) authContext.setUser(user);
      else authContext.setUser(null);

      // Set the auth is loaded.
      authContext.setAuthIsLoaded(true);

      // Hide loading message.
      loadingContext.hideLoading();
    });
  }, [firebase.auth, authContext, loadingContext]);

  // On component mounts
  useLayoutEffect(() => loadApp(), [loadApp]);

  return (
    <>
      {/* Loading overlay. Is not a condition rendering because we want fading => Soluction: Overlay message with own context. Do not mistake with auth state, used for change the loading. Other aspects can trigger loading as well */}
      <Loading />
      {/* Floating message shown for user info all over the app */}
      <FloatingMessage />
      {/* Navigation */}
      <Navigation />
      {/* Router */}
      <Switch>
        {routesArray.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            exact={route.exact}
            component={route.Component}
          />
        ))}
      </Switch>
    </>
  );
};

// App uploads the user when mounted. May be a problem to access it on other components componentDidMount function.
export default withLoading(withAuth(withFirebase(App)));

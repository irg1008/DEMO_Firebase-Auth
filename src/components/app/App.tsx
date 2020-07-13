import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

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
   * Location of router props.
   *
   * @type {*}
   */
  location: any;

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
 * App class.
 *
 * @class App
 * @extends {Component<IAppProps>}
 */
class App extends Component<IAppProps> {
  /**
   * On component mount start oading and check for user signed.
   *
   * @memberof App
   */
  componentDidMount = (): void => {
    // Firebase consumer.
    const { firebase, loadingContext } = this.props;

    // Set user funtion of auth consumer.
    const { setUser, setAuthIsLoaded } = this.props.authContext;

    // Start loading
    loadingContext.showLoading();

    // We recheck the user on app mount. Like reload or redirects. The user is check on log in and sign out.
    firebase.auth.onAuthStateChanged((user: any) => {
      // TODO: Set user of auth context only if the user is verified.
      setUser(user);

      // Set the auth is loaded.
      setAuthIsLoaded(true);

      // Hide loading message.
      loadingContext.hideLoading();
    });
  };

  /**
   * Render app.
   *
   * @returns
   * @memberof App
   */
  render() {
    return (
      <>
        {/* Loading overlay. Is not a condition rendering because we want fading => Soluction: Overlay message with own context. Do not mistake with auth state, used for change the loading. Other aspects can trigger loading as well */}
        <Loading />
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
  }
}

// App uploads the user when mounted. May be a problem to access it on other components componentDidMount function.
export default withLoading(withAuth(withRouter(withFirebase(App))));

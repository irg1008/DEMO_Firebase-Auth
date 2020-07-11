import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
    const { setUser } = this.props.authContext;

    // Start loading
    loadingContext.showLoading();

    // We recheck the user on app mount. Like reload or redirects. The user is check on log in and sign out.
    firebase.auth.onAuthStateChanged((user: any) => {
      // Set user of auth context.
      user ? setUser(user) : setUser(null);
      // Hide loading
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
      <Router>
        {/* Loading overlay */}
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
      </Router>
    );
  }
}

// App uploads the user when mounted. May be a problem to access it on other components componentDidMount function.
export default withLoading(withAuth(withFirebase(App)));

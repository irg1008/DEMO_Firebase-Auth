import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import LandingPage from "../pages/landing_page";
import ErrorPage from "../pages/error_page";
import LogInPage from "../pages/log_in_page";
import SignUpPage from "../pages/sign_up_page";

// Const routes
import * as ROUTES from "../constants/routes";

/**
 * App.
 *
 * @returns Navegation + main pages.
 */
const App = () => {
  return (
      <Router>
        {/* Navigation here */}
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.LOG_IN} component={LogInPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
  );
};

export default App;

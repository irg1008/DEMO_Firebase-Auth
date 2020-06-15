import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Const routes
import pages from "../constants/routes";

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
        {pages.map((route) => (
          <Route
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default App;

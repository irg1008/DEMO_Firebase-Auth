import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Const routes
import ROUTES from "../../routes";

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
        {ROUTES.all.map((route) => (
          <Route
            key={route.id}
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

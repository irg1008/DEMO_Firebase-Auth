import React from "react";
import { Route, Switch } from "react-router-dom";

// Const routes
import { ROUTES, IPageType } from "./";

// All pages on array
const routesArray = Object.values(ROUTES);

const ProtectedRoutes: React.FC = () => (
  <Switch>
    {routesArray.map((route: IPageType) => (
      <Route
        key={route.id}
        path={route.path}
        exact={route.exact}
        component={route.Component}
      />
    ))}
  </Switch>
);

export default ProtectedRoutes;

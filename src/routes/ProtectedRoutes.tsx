import React from "react";
import { Route, Switch } from "react-router-dom";

// Const routes
import { ROUTES, IPageType } from "./";

// Firebase context
import { useFirebase } from "../context/firebase";

// All pages on array
const routesArray = Object.values(ROUTES);

const ProtectedRoutes: React.FC = () => {
  // Firebase context
  const { authUser } = useFirebase().state;

  // Routes if user is or not autehnticated.
  const finalRoutes = authUser
    ? routesArray.filter((route) => !route.formPage)
    : routesArray.filter((route) => !route.userIsSignedPage);

  return (
    <Switch>
      {finalRoutes.map((route: IPageType) => (
        <Route
          key={route.id}
          path={route.path}
          exact={route.exact}
          component={route.Component}
        />
      ))}
    </Switch>
  );
};

export default ProtectedRoutes;

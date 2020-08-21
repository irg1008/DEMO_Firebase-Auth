import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Const routes.
import { ROUTES, IPageType } from "./";

// Firebase context.
import { useFirebase } from "../context/firebase";

// All pages on array.
const routesArray = Object.values(ROUTES);

/**
 * Protected routes.
 *
 * @returns
 */
const ProtectedRoutes: React.FC = () => {
  // Firebase context.
  const { authUser } = useFirebase().state;

  // Routes if user is or not autehnticated.
  // -> If user is signed => Hide user is signed pages.
  // -> If user is not signed => Hide user is unsigned pages.
  const finalRoutes = authUser
    ? routesArray.filter((route) => !route.hideOnUserSigned)
    : routesArray.filter((route) => !route.hideOnUserUnsigned);

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
      {/* If no route is valid for given path => Redirect to error page. */}
      <Redirect to={ROUTES.ERROR.path} />
    </Switch>
  );
};

export default ProtectedRoutes;

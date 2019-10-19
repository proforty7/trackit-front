import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ path, component: Component, user, ...props }) => {
  if (user)
    return (
      <Route
        {...props}
        to={path}
        render={() => (
          <>
            <Navbar />
            <Component {...props} user={user} />
          </>
        )}
      />
    );
  return <Redirect to="/" />;
};

const Routing = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <BrowserRouter>
      <Switch></Switch>
    </BrowserRouter>
  );
};

export default Routing;

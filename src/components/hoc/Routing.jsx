import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../elements/Navbar";
import Home from "../screens/Home";
import Register from "../screens/Register";
import CreateProfile from "../screens/CreateProfile";

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
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <PrivateRoute
          path="/create-profile"
          component={CreateProfile}
          user={user}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;

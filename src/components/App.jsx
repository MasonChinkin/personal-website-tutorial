import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CreateReactApp from "./CreateReactApp";

const App = () => (
  <>
    <Switch>
      <Route exact path={'/baseapp'} component={CreateReactApp} />
      {/* Insert other routes here */}
      <Redirect to="/baseapp" />
    </Switch>
  </>
);

export default App;

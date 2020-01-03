import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CreateReactApp from "./CreateReactApp";

const App = () => (
  <>
    <Switch>
      <Route exact path={'/'} component={CreateReactApp} />
      {/* Insert other routes here */}
      <Redirect to="/" />
    </Switch>
  </>
);

export default App;

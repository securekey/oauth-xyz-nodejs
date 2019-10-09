import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import UserRedirect from "./userRedirect";
const createRoutes = () => (
  <BrowserRouter>
    <Route exact path="/redirect" component={UserRedirect} />
    <Route exact path="/" component={App} />
  </BrowserRouter>
);

export default createRoutes;

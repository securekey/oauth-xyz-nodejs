import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import UserRedirect from "./userRedirect";
import DeviceRedirect from "./deviceRedirect";
import TxComponent from "./TxComponent";

const createRoutes = () => (
  <BrowserRouter>
    <Route exact path="/redirect" component={UserRedirect} />
    <Route exact path="/device" component={DeviceRedirect} />
    <Route exact path="/" component={App} />
  </BrowserRouter>
);

export default createRoutes;

/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';

const createRoutes = () => (
  <BrowserRouter>
    <Route exact path="/" component={App} />
  </BrowserRouter>
);

export default createRoutes;

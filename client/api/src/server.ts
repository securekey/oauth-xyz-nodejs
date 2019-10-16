/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import app from './app';
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Application listening on port %d', PORT);
});

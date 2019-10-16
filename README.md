# OAuth XYZ - Reference Implementation (TypeScript)

## Introduction

This repository is a TypeScript (NodeJS + Express) reference implementation for the [OAuth.XYZ Authorization Protocol](https://oauth.xyz/). It contains code for both the client, and the server, in this repo. The server is an Express app with MongoDB. The client API is also an Express app with MongoDB, and the client frontend is a React app.

The repo comes with a docker-compose configuration which can set up both the client and server, along with the client frontend, all together in minutes.

## Client Capabilities

- Able to perform full Redirect with Callback flow
- Able to perform full Device with polling flow
- Able to perform full Redirect with polling flow
- Can edit transaction object being sent to the authorization server through the frontend

## Authorization Server Capabilities

- Generates and stores handles for all sections in a Transaction Request
- Can parse and use handles, objects, or a combination of both for any Transaction

## Setup

- Clone the repo
- Make sure you have docker and docker-compose installed
- Run `docker-compose build && docker-compose up` to start the network

## Known Limitations/Bugs

- Even though there is code on the database side for it, was unable to get `express-sessions` working on localhost dev server. As a result, if this implementation is hosted online, everyone can view everyone's transactions. The solution to this is simple, uncomment the session code in `app.ts` and get it to work.

## Note

The OAuth XYZ spec is still a work in progress, and this implementation may not stay up to date as changes are made to the spec.

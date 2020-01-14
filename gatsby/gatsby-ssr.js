/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react";

import { LocationProvider } from "./src/context/location";
import { UserProvider } from "./src/context/user";

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link
      key="firebaseinit"
      rel="preload"
      href="/__/firebase/init.json"
      as="fetch"
      crossOrigin="anonymous"
    ></link>
  ]);
};

export const wrapPageElement = ({ element }) => (
  <LocationProvider>{element}</LocationProvider>
);

export const wrapRootElement = ({ element }) => (
  <UserProvider>{element}</UserProvider>
);

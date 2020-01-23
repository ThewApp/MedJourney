/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from "react";

import { LocationProvider } from "./src/context/location";
import { UserProvider } from "./src/context/user";
import { logPageView, initAnalytics } from "./src/firebase/analytics";

export const onInitialClientRender = () => {
  initAnalytics();
};

export const onRouteUpdate = ({ prevLocation }) => {
  if (prevLocation) {
    // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/gatsby-browser.js#L24
    setTimeout(() => logPageView(), 32);
  }
};

export const wrapPageElement = ({ element }) => (
  <LocationProvider>{element}</LocationProvider>
);

export const wrapRootElement = ({ element }) => (
  <UserProvider>{element}</UserProvider>
);

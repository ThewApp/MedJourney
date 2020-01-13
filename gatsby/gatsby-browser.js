/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from "react";

import { UserProvider } from "./src/context/user.js";
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

export const wrapRootElement = ({ element }) => (
  <UserProvider>{element}</UserProvider>
);

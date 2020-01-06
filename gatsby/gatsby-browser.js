/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

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

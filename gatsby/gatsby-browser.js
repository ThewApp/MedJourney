/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import getFirebase from "./src/firebase";

export const onRouteUpdate = ({ prevLocation }) => {
  if (!prevLocation) {
    getFirebase(firebase => firebase.analytics());
  } else {
    // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/gatsby-browser.js#L24
    setTimeout(() => getFirebase(firebase => firebase.analytics().logEvent("page_view")), 32);
  }
};

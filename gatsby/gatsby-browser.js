/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const onRouteUpdate = ({ prevLocation }) => {
  if (!prevLocation) {
    /* global firebase */
    firebase.analytics();
  } else {
    // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/gatsby-browser.js#L24
    setTimeout(() => firebase.analytics().logEvent("page_view"), 32);
  }
};

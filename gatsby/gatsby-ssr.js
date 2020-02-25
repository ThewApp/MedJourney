/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === "production") {
    setHeadComponents(
      <link rel="preconnect" key="unpkg.com" href="https://unpkg.com/" />
    );
  }
};

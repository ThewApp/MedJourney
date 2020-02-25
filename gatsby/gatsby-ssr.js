/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react");

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  if (process.env.NODE_ENV === "production") {
    setHeadComponents(
      <link rel="preconnect" key="unpkg.com" href="https://unpkg.com/" />
    );
    setPostBodyComponents(
      <>
        <script
          type="text/javascript"
          key="react.production"
          src="https://unpkg.com/react@16.12.0/umd/react.production.min.js"
        />
        <script
          type="text/javascript"
          key="react-dom.production"
          src="https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js"
        />
      </>
    );
  }
};

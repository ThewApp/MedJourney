/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react");

exports.onRenderBody = ({ setPostBodyComponents }) => {
  if (process.env.NODE_ENV === "development") {
    setPostBodyComponents(
      <>
        <script
          type="text/javascript"
          async
          key="react.development"
          src="https://unpkg.com/react@16.12.0/umd/react.development.js"
        />
        <script
          type="text/javascript"
          async
          key="react-dom.development"
          src="https://unpkg.com/react-dom@16.12.0/umd/react-dom.development.js"
        />
      </>
    );
  } else {
    setPostBodyComponents(
      <>
        <script
          type="text/javascript"
          async
          key="react.production"
          src="https://unpkg.com/react@16.12.0/umd/react.production.min.js"
        />
        <script
          type="text/javascript"
          async
          key="react-dom.production"
          src="https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js"
        />
      </>
    );
  }
};

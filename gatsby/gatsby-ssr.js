/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react";

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link
      key="googletagmanager"
      rel="preconnect"
      href="https://www.googletagmanager.com"
    ></link>,
    <link
      key="firebaseinstallations"
      rel="preconnect"
      href="https://firebaseinstallations.googleapis.com"
    ></link>
  ]);
};

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react";

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link
      key="firebaseinit"
      rel="preload"
      href="/__/firebase/init.json"
      as="fetch"
      crossOrigin="anonymous"
    ></link>,
    <link
      key="firebaseinstallations"
      rel="preconnect"
      href="https://firebaseinstallations.googleapis.com"
    ></link>,
    <link
      key="googletagmanager"
      rel="preconnect"
      href="https://www.googletagmanager.com"
    ></link>
  ]);
};

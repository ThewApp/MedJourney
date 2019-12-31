/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react";

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script src="/__/firebase/7.6.1/firebase-app.js"></script>,
    <script src="/__/firebase/7.6.1/firebase-analytics.js"></script>,
    <script src="/__/firebase/7.6.1/firebase-auth.js"></script>,
    <script src="/__/firebase/7.6.1/firebase-firestore.js"></script>,
    <script src="/__/firebase/7.6.1/firebase-functions.js"></script>,
    <script src="/__/firebase/init.js"></script>
  ]);
};

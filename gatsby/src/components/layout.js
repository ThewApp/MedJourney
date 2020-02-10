/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import "./tailwind.css";
import Header from "./header";
import Footer from "./footer";
import User from "./user";

const Layout = ({ children, location, requiredAuth = false }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          shortTitle
          facebook
        }
      }
    }
  `);

  return (
    <div className="font-sans	antialiased min-h-screen flex flex-col">
      <User location={location} requiredAuth={requiredAuth} />
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteShortTitle={data.site.siteMetadata.shortTitle}
        requiredAuth={requiredAuth}
      />
      <main className="flex-auto">{children}</main>
      <Footer facebook={data.site.siteMetadata.facebook} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  requiredAuth: PropTypes.bool
};

export default Layout;

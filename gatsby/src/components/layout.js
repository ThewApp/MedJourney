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

const Layout = ({ children }) => {
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
    <div className="antialiased min-h-screen flex flex-col">
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteShortTitle={data.site.siteMetadata.shortTitle}
      />
      <main className="flex-auto">{children}</main>
      <Footer facebook={data.site.siteMetadata.facebook} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;

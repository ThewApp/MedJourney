import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Cover from "../components/cover";

const Header = ({ siteTitle }) => (
  <header className="mb-6">
    <div className="bg-primary-800 py-4 md:py-6 px-5 md:hidden">
    <h1 className="m-0 text-lg sm:text-2xl md:text-4xl text-white no-underline">
      <Link to="/">{siteTitle}</Link>
    </h1>
    </div>
    <Cover />
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;

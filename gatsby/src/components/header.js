import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import useUser from "../stores/user";

const Header = ({ siteTitle, siteShortTitle }) => {
  const userSignout = useUser(state => state.signOut);
  const authUser = useUser(state => state.authUser);
  return (
    <header>
      <div className="bg-primary-800 flex items-center py-4 px-5 text-white no-underline">
        <h1 className="hidden md:block text-2xl">
          <Link to="/">{siteTitle}</Link>
        </h1>
        <h1 className="md:hidden text-lg sm:text-xl">
          <Link to="/">{siteShortTitle}</Link>
        </h1>
        {authUser && (
          <Link to="/" className="ml-auto" onClick={userSignout}>
            ออกจากระบบ
          </Link>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;

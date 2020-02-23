import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby";

const Footer = ({ facebook }) => (
  <footer className="bg-gray-800">
    <div className="container flex mx-auto flex-col text-white py-8 px-3 sm:p-12">
      <div className="flex mb-4">
        <p className="mr-2">ติดตามรายละเอียดเพิ่มเติม ทาง</p>
        <a
          className="md:mx-4 inline-flex"
          href={facebook}
          aria-label="Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            className="fill-current h-6 w-6 mx-1 sm:mx-2"
            viewBox="0 0 24 24"
          >
            <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" />
          </svg>
          <span className="hidden sm:inline">
            MDCU Open House 2020 : MedJourney
          </span>
        </a>
      </div>
      <div>
        <Link to="/privacy">นโยบายการคุ้มครองข้อมูลส่วนบุคคล</Link>
      </div>

      <div className="text-gray-300 text-sm sm:ml-auto mt-8">
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  facebook: PropTypes.string
};

export default Footer;

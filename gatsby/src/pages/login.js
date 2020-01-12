import React, { useState, useEffect } from "react";
import { Link, navigate } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { useAuth } from "../firebase";
import queryString from "query-string";

const LoginPage = ({ location }) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      const redirectUrl =
        queryString.parse(location.search).redirect || "/register";

      auth()
        .getRedirectResult()
        .then(function(result) {
          if (result.user) {
            navigate(redirectUrl, { replace: true });
          } else {
            setLoading(false);
          }
        })
        .catch(function(error) {
          setLoading(false);
          console.error(error);
        });

      return auth().onAuthStateChanged(function(user) {
        if (user) {
          navigate(redirectUrl, { replace: true });
        }
      });
    }
  }, [auth, location.search]);

  useEffect(() => {
    if (sessionStorage.getItem("signInWithRedirect")) {
      setLoading(true);
      sessionStorage.removeItem("signInWithRedirect");
    }
  }, []);

  function fbLogin() {
    if (auth) {
      const provider = new auth.FacebookAuthProvider();
      auth().signInWithRedirect(provider);
      sessionStorage.setItem("signInWithRedirect", "true");
    }
  }

  return (
    <Layout>
      <SEO title="ลงทะเบียนด้วย Facebook" />
      <div className="w-full max-w-md mx-auto md:shadow-md rounded p-3 sm:p-6 md:p-8 mt-16 mb-32 text-center">
        {loading ? (
          "กำลังโหลด..."
        ) : (
          <>
            <button
              className="text-white py-2 px-4 rounded inline-flex items-center sm:text-lg md:text-xl"
              onClick={fbLogin}
              style={{ backgroundColor: "#4267B2" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                className="fill-current h-6 w-6 mr-2"
                viewBox="0 0 24 24"
              >
                <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" />
              </svg>
              ลงทะเบียนด้วย Facebook
            </button>
            <p className="mt-4 text-sm text-gray-600">
              <Link to="/legacy-login">ไม่มี Facebook</Link>
            </p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default LoginPage;

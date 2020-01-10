import React from "react";
import { Link, navigate } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { useAuth, useFunctions } from "../firebase";
import { useForm } from "react-hook-form";
import queryString from "query-string";

const LegacyLoginPage = ({ location }) => {
  const auth = useAuth();
  const functions = useFunctions();
  const { register, handleSubmit, errors } = useForm();

  const redirectUrl =
    queryString.parse(location.search).redirect || "/register";

  if (auth) {
    const authListener = auth().onAuthStateChanged(function(user) {
      if (user) {
        navigate(redirectUrl, { replace: true });
      }
    });
    if (auth().currentUser) {
      authListener();
      navigate(redirectUrl, { replace: true });
    }
  }

  const onSubmit = data => {
    const registerLegacy = functions("asia-east2").httpsCallable("legacyLogin");
    registerLegacy(data).then(result => {
      auth().signInWithCustomToken(result.data.token);
    });
  };

  return (
    <Layout>
      <SEO title="ลงทะเบียนด้วยบัตรประชาชน" />
      <div className="w-full max-w-md mx-auto md:shadow-md rounded p-3 sm:p-6 mt-6 mb-16">
        <h1 className="font-bold text-lg mb-4">ลงทะเบียนด้วยบัตรประชาชน</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text mb-2" htmlFor="thaiId">
              บัตรประชาชน 13 หลัก
            </label>
            <input
              className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="thaiId"
              name="thaiId"
              type="number"
              ref={register({ required: true, minLength: 13, maxLength: 13 })}
            />
            {errors.thaiId && (
              <span className="text-sm text-primary-400">จำเป็นต้องใส่</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text mb-2" htmlFor="birthday">
              วันเกิด
            </label>
            <input
              className={
                "shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
                (errors.birthday ? " border-primary-400" : "")
              }
              id="birthday"
              name="birthday"
              type="date"
              ref={register({ required: true })}
            />
            {errors.birthday && (
              <span className="text-sm text-primary-400">จำเป็นต้องใส่</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link to="/login" className="text-sm text-gray-600 align-baseline">
              ลงทะเบียนด้วย Facebook
            </Link>
            <button
              className="my-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              ลงทะเบียน
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LegacyLoginPage;

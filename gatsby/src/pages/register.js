import React, { useState } from "react";
import { Link, navigate } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { useAuth, useFirestore } from "../firebase";
import { useForm } from "react-hook-form";

const RegisterPage = ({ location }) => {
  const auth = useAuth();
  const firestore = useFirestore();
  if (auth && !auth().currentUser) {
    auth().signOut();
    navigate("/login");
  }
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Layout>
      <SEO title="ลงทะเบียน" />
      <div tabIndex="5" className="w-full max-w-md mx-auto md:shadow-md rounded p-3 sm:p-6 md:p-8 mt-16 mb-32">
        <h1 className="font-bold text-lg mb-4">กรอกข้อมูลส่วนตัว</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text mb-2"
              htmlFor="firstName"
            >
              ชื่อ
            </label>
            <input
              className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              name="firstName"
              ref={register({ required: true })}
            />
            {errors.firstName && (
              <span className="text-sm text-primary-400">จำเป็นต้องใส่</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text mb-2" htmlFor="lastName">
              นามสกุล
            </label>
            <input
              className={
                "shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
                (errors.lastName ? " border-primary-400" : "")
              }
              id="lastName"
              name="lastName"
              ref={register({ required: true })}
            />
            {errors.lastName && (
              <span className="text-sm text-primary-400">จำเป็นต้องใส่</span>
            )}
          </div>

          <div className="flex items-center justify-end">
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

export default RegisterPage;

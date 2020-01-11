import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { useAuth, useFirestore } from "../firebase";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const auth = useAuth();
  const firestore = useFirestore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth && !auth().currentUser) {
      navigate("/login", { replace: true });
    }
  }, [auth]);

  useEffect(() => {
    if (auth && auth().currentUser && firestore) {
      firestore()
        .doc("users/" + auth().currentUser.uid)
        .get()
        .then(doc => {
          if (doc.get("firstName")) {
            navigate("/profile", { replace: true });
          }
        });
    }
  }, [auth, firestore]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    if (auth && auth().currentUser && firestore) {
      setLoading(true);
      firestore()
        .doc("users/" + auth().currentUser.uid)
        .update({
          firstName: data.firstName,
          lastName: data.lastName
        })
        .then(() => {
          navigate("/profile", { replace: true });
        });
    }
  };

  return (
    <Layout>
      <SEO title="ลงทะเบียน" />
      <div className="w-full max-w-md mx-auto md:shadow-md rounded p-3 sm:p-6 md:p-8 mt-16 mb-32">
        {loading ? (
          <p className="text-center">กำลังลงทะเบียน</p>
        ) : (
          <>
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
                  <span className="text-sm text-primary-400">
                    จำเป็นต้องใส่
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text mb-2"
                  htmlFor="lastName"
                >
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
                  <span className="text-sm text-primary-400">
                    จำเป็นต้องใส่
                  </span>
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default RegisterPage;

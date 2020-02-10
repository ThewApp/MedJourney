import React, { useState } from "react";
import { Link } from "gatsby";
import { useForm } from "react-hook-form";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Spinner from "../components/spinner";
import { TextInput } from "../components/inputs";
import { useAuth, useFunctions } from "../firebase";

const LegacyLoginPage = ({ location }) => {
  const { authUser } = useUser();
  const auth = useAuth();
  const functions = useFunctions();
  const forms = useForm();
  const { register, handleSubmit, setError } = forms;
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = data => {
    const thaiIdArray = data.thaiId.split("");
    const checkSum =
      (11 -
        (thaiIdArray
          .slice(0, 12)
          .reduce(
            (sum, digit, index) => sum + (13 - Number(index)) * digit,
            0
          ) %
          11)) %
      10;
    if (checkSum === Number(data.thaiId[12])) {
      setSubmitting(true);
      const registerLegacy = functions("asia-east2").httpsCallable(
        "legacyLogin"
      );
      registerLegacy(data).then(
        result => {
          auth().signInWithCustomToken(result.data.token);
        },
        error => {
          if ((error.message = "wrong-birthday")) {
            setSubmitting(false);
            setError("birthday", "wrong-birthday", "ไม่ถูกต้อง");
          }
        }
      );
    } else {
      setError("thaiId", "wrong-thaiId", "เลขประจำตัวประชาชนไม่ถูกต้อง");
    }
  };

  useEffect(() => {
    /* global ___loader */
    ___loader.enqueue(redirectUrl);
  }, [redirectUrl]);

  return (
    <Layout location={location}>
      <SEO title="ลงทะเบียนด้วยเลขประจำตัวประชาชน" />
      <div className="w-full max-w-md mx-auto md:shadow-md rounded p-3 sm:p-6 md:p-8 mt-16 mb-32">
        <h1 className="font-bold text-lg mb-4">
          ลงทะเบียนด้วยเลขประจำตัวประชาชน
        </h1>
        {submitting && <Spinner />}
        <form
          className={submitting ? "hidden" : ""}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            label="เลขประจำตัวประชาชน 13 หลัก"
            name="thaiId"
            type="number"
            ref={register({
              required: true,
              minLength: 13,
              maxLength: 13
            })}
            forms={forms}
            disabled={submitting}
          />

          <TextInput
            label="วันเกิด"
            name="birthday"
            type="date"
            ref={register({
              required: true
            })}
            forms={forms}
            disabled={submitting}
          />

          <div className="flex items-center justify-between">
            <Link to="/login" className="text-sm text-gray-600 align-baseline">
              ลงทะเบียนด้วย Facebook
            </Link>
            <button
              className="my-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={submitting}
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

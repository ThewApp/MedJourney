import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Spinner from "../components/spinner";
import useUser from "../stores/user";

const getByPath = (obj, path) =>
  path.split(/[[\].]/).reduce((obj, key) => obj?.[key], obj);

const TextInput = React.forwardRef(
  ({ label, name, forms, placeholder }, ref) => {
    const error = getByPath(forms.errors, name);
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
          {label}
        </label>
        <input
          className="form-input w-full"
          id={name}
          name={name}
          ref={ref}
          placeholder={placeholder}
        />
        {error?.type === "required" && (
          <p className="text-sm text-primary-400">จำเป็นต้องใส่</p>
        )}
        {error?.message && (
          <p className="text-sm text-primary-400">{error?.message}</p>
        )}
      </div>
    );
  }
);

const RadioGroup = React.forwardRef(
  ({ label, name, options, other, forms }, ref) => {
    const otherName = typeof other === "string" ? other : name + "_other";
    const error = getByPath(forms.errors, name);
    const otherError = getByPath(forms.errors, otherName);
    return (
      <div className="mb-4">
        <p className="block text-gray-700 font-medium mb-2">{label}</p>
        {options.map(option => (
          <label className="inline-block mx-2" key={option}>
            <input
              type="radio"
              className="form-radio"
              name={name}
              ref={ref}
              value={option}
            />
            <span className="ml-1">{option}</span>
          </label>
        ))}
        {other && (
          <div className="inline-block mx-2">
            <label className="inline-block mx-2 py-3">
              <input
                type="radio"
                className="form-radio"
                name={name}
                ref={ref}
                value="อื่นๆ"
              />
              <span className="ml-1">อื่นๆ</span>
            </label>
            {forms.watch(name) === "อื่นๆ" && (
              <input
                className="form-input"
                name={otherName}
                ref={ref}
                placeholder="โปรดระบุ"
              />
            )}
          </div>
        )}

        {(error?.type === "required" || otherError?.type === "required") && (
          <p className="text-sm text-primary-400">จำเป็นต้องใส่</p>
        )}
        {(error?.message || otherError?.message) && (
          <p className="text-sm text-primary-400">
            {error?.message || otherError?.message}
          </p>
        )}
      </div>
    );
  }
);

const RegisterPage = ({ location }) => {
  const firestoreUserRef = useUser(state => state.firestoreUserRef);
  const [loading, setLoading] = useState(false);

  const forms = useForm();
  const { register, handleSubmit, watch, errors } = forms;

  const onSubmit = data => {
    setLoading(true);
    firestoreUserRef.update({
      name: data.name
    });
    firestoreUserRef
      .collection("userData")
      .doc("registration")
      .set({
        gender: data.gender_other || data.gender,
        age: data.age
      });
  };

  console.log(watch(), errors);

  return (
    <Layout location={location}>
      <SEO title="กรอกข้อมูลส่วนตัว" />
      <div className="w-full max-w-lg mx-auto md:shadow-md rounded p-3 sm:p-6 md:p-8 mt-16 mb-32">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="font-bold text-lg mb-4">กรอกข้อมูลส่วนตัว</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                label="ชื่อ"
                name="name.first"
                ref={register({ required: true })}
                forms={forms}
              />
              <TextInput
                label="นามสกุล"
                name="name.last"
                ref={register({ required: true })}
                forms={forms}
              />
              <RadioGroup
                label="เพศ"
                name="gender"
                options={["ชาย", "หญิง"]}
                ref={register({ required: true })}
                forms={forms}
                other
              />
              <TextInput
                label="อายุ"
                name="age"
                ref={register({ required: true })}
                forms={forms}
              />

              <div className="flex items-center justify-end">
                <button
                  className="my-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  บันทึก
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

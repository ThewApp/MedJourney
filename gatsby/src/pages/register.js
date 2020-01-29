import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Spinner from "../components/spinner";
import useUser from "../stores/user";

const getByPath = (obj, path) =>
  path.split(/[[\].]/).reduce((obj, key) => obj?.[key], obj);

const provinces = [
  "กรุงเทพมหานคร",
  "กระบี่",
  "กาญจนบุรี",
  "กาฬสินธุ์",
  "กำแพงเพชร",
  "ขอนแก่น",
  "จันทบุรี",
  "ฉะเชิงเทรา",
  "ชลบุรี",
  "ชัยนาท",
  "ชัยภูมิ",
  "ชุมพร",
  "เชียงใหม่",
  "เชียงราย",
  "ตรัง",
  "ตราด",
  "ตาก",
  "นครนายก",
  "นครปฐม",
  "นครพนม",
  "นครราชสีมา",
  "นครศรีธรรมราช",
  "นครสวรรค์",
  "นนทบุรี",
  "นราธิวาส",
  "น่าน",
  "บึงกาฬ",
  "บุรีรัมย์",
  "ปทุมธานี",
  "ประจวบคีรีขันธ์",
  "ปราจีนบุรี",
  "ปัตตานี",
  "พระนครศรีอยุธยา",
  "พะเยา",
  "พังงา",
  "พัทลุง",
  "พิจิตร",
  "พิษณุโลก",
  "เพชรบุรี",
  "เพชรบูรณ์",
  "แพร่",
  "ภูเก็ต",
  "มหาสารคาม",
  "มุกดาหาร",
  "แม่ฮ่องสอน",
  "ยโสธร",
  "ยะลา",
  "ร้อยเอ็ด",
  "ระนอง",
  "ระยอง",
  "ราชบุรี",
  "ลพบุรี",
  "ลำปาง",
  "ลำพูน",
  "เลย",
  "ศรีสะเกษ",
  "สกลนคร",
  "สงขลา",
  "สตูล",
  "สมุทรปราการ",
  "สมุทรสงคราม",
  "สมุทรสาคร",
  "สระแก้ว",
  "สระบุรี",
  "สิงห์บุรี",
  "สุโขทัย",
  "สุพรรณบุรี",
  "สุราษฎร์ธานี",
  "สุรินทร์",
  "หนองคาย",
  "หนองบัวลำภู",
  "อ่างทอง",
  "อำนาจเจริญ",
  "อุดรธานี",
  "อุตรดิตถ์",
  "อุทัยธานี",
  "อุบลราชธานี"
];

const ErrorMessage = ({ error }) => {
  return error ? (
    <div className="text-sm text-primary-400">
      {error?.type === "required" && <p>กรุณาระบุ</p>}
      {error?.message && <p>{error?.message}</p>}
    </div>
  ) : null;
};

const TextInput = React.forwardRef(
  ({ label, name, forms, placeholder, type }, ref) => {
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
          type={type || "text"}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
);

const RadioGroup = React.forwardRef(
  ({ label, name, options, others, forms }, ref) => {
    const othersName = typeof others === "string" ? others : name + "_others";
    const error = getByPath(forms.errors, name);
    const othersError = getByPath(forms.errors, othersName);
    return (
      <div className="mb-4">
        <p className="block text-gray-700 font-medium mb-2">{label}</p>
        {options.map(option => (
          <label className="inline-flex mx-2 my-1" key={option}>
            <input
              type="radio"
              className="form-radio mt-1"
              name={name}
              ref={ref}
              value={option}
            />
            <span className="ml-1">{option}</span>
          </label>
        ))}
        {others && (
          <div className="inline-block">
            <label className="inline-flex mx-2 py-3">
              <input
                type="radio"
                className="form-radio mt-1"
                name={name}
                ref={ref}
                value="อื่น ๆ"
              />
              <span className="ml-1">อื่น ๆ</span>
            </label>
            {forms.watch(name) === "อื่น ๆ" && (
              <input
                className="form-input"
                name={othersName}
                ref={ref}
                placeholder="โปรดระบุ"
              />
            )}
          </div>
        )}
        <ErrorMessage error={error} />
        <ErrorMessage error={othersError} />
      </div>
    );
  }
);

const Select = React.forwardRef(
  ({ label, name, options, others, forms }, ref) => {
    const othersName = typeof others === "string" ? others : name + "_others";
    const error = getByPath(forms.errors, name);
    const othersError = getByPath(forms.errors, othersName);
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
          {label}
        </label>
        <select
          className="form-select block w-full"
          id={name}
          name={name}
          ref={ref}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}

          {others && (
            <option key="others" value="อื่น ๆ">
              อื่น ๆ
            </option>
          )}
        </select>

        {forms.watch(name) === "อื่น ๆ" && (
          <input
            className="form-input"
            name={othersName}
            ref={ref}
            placeholder="โปรดระบุ"
          />
        )}
        <ErrorMessage error={error} />
        <ErrorMessage error={othersError} />
      </div>
    );
  }
);

const Checks = React.forwardRef(
  ({ label, name, options, others, forms }, ref) => {
    const othersName = typeof others === "string" ? others : name + "_others";
    const error = getByPath(forms.errors, name);
    const othersError = getByPath(forms.errors, othersName);
    return (
      <div className="mb-4">
        <p className="block text-gray-700 font-medium mb-2">
          {label}{" "}
          <span className="font-normal text-gray-500 whitespace-no-wrap">
            (ระบุได้มากกว่า 1 ข้อ)
          </span>
        </p>
        {options.map(option => (
          <label className="flex mx-2 my-1" key={option}>
            <input
              type="checkbox"
              className="form-checkbox mt-1"
              name={name}
              ref={ref}
              value={option}
            />
            <span className="ml-1">{option}</span>
          </label>
        ))}
        {others && (
          <div className="block">
            <label className="inline-flex mx-2 py-3">
              <input
                type="checkbox"
                className="form-checkbox mt-1"
                name={name}
                ref={ref}
                value="อื่น ๆ"
              />
              <span className="ml-1">อื่น ๆ</span>
            </label>
            {forms.watch(name)?.includes("อื่น ๆ") && (
              <input
                className="form-input"
                name={othersName}
                ref={ref}
                placeholder="โปรดระบุ"
              />
            )}
          </div>
        )}
        <ErrorMessage error={error} />
        <ErrorMessage error={othersError} />
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
        gender: data.gender_others || data.gender,
        age: data.age,
        job: data.job
      });
  };

  console.log(watch(), errors);

  const schoolForm = (
    <>
      <Select
        label="ระดับชั้น"
        name="school.grade"
        options={[
          "มัธยมศึกษาปีที่ 6",
          "มัธยมศึกษาปีที่ 5",
          "มัธยมศึกษาปีที่ 4",
          "มัธยมศึกษาตอนต้น",
          "ประถมศึกษาตอนปลาย",
          "ประถมศึกษาตอนต้น หรือ ต่ำกว่า"
        ]}
        ref={register({ required: true })}
        forms={forms}
      />
      <RadioGroup
        label="แผนการเรียน"
        name="school.major"
        options={["วิทย์-คณิต", "ศิลป์-คำนวณ", "ศิลป์-ภาษา", "Gifted"]}
        ref={register({ required: true })}
        forms={forms}
        others
      />
      <TextInput
        label="โรงเรียน"
        name="school.name"
        ref={register({ required: true })}
        forms={forms}
      />
      <Select
        label="จังหวัดของโรงเรียน"
        name="school.province"
        options={provinces}
        ref={register({ required: true })}
        forms={forms}
      />
    </>
  );

  const universityForm = (
    <>
      <Select
        label="ชั้นปี"
        name="university.year"
        options={["ปี 1", "ปี 2", "ปี 3", "ปี 4", "ปี 5", "ปี 6"]}
        ref={register({ required: true })}
        forms={forms}
      />
      <TextInput
        label="คณะ"
        name="university.major"
        ref={register({ required: true })}
        forms={forms}
      />
      <TextInput
        label="มหาวิทยาลัย"
        name="university.name"
        ref={register({ required: true })}
        forms={forms}
      />
      <Select
        label="จังหวัดของมหาวิทยาลัย"
        name="university.province"
        options={provinces}
        ref={register({ required: true })}
        forms={forms}
      />
    </>
  );

  const parentForm = (
    <>
      <TextInput
        label="อาชีพ/สายงานที่ปฏิบัติอยู่"
        name="parent.field"
        ref={register({ required: true })}
        forms={forms}
      />
    </>
  );

  return (
    <Layout location={location} requiredAuth>
      <SEO title="กรอกข้อมูลส่วนตัว" />
      <div className="w-full max-w-lg mx-auto md:shadow-md rounded p-3 sm:p-4 md:p-5 mt-8 mb-12">
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
                options={["ชาย", "หญิง", "อื่น ๆ"]}
                ref={register({ required: true })}
                forms={forms}
              />
              <TextInput
                label="อายุ"
                name="age"
                ref={register({ required: true })}
                forms={forms}
                type="number"
              />
              <RadioGroup
                label="อาชีพ"
                name="job"
                options={[
                  "นักเรียน",
                  "นิสิต/นักศึกษา",
                  "ผู้ปกครอง",
                  "บุคคลทั่วไป"
                ]}
                ref={register({ required: true })}
                forms={forms}
              />

              {watch("job") === "นักเรียน" && schoolForm}
              {watch("job") === "นิสิต/นักศึกษา" && universityForm}
              {(watch("job") === "ผู้ปกครอง" ||
                watch("job") === "บุคคลทั่วไป") &&
                parentForm}

              <Select
                label="จังหวัดที่พักอาศัย"
                name="province"
                options={provinces}
                ref={register({ required: true })}
                forms={forms}
              />

              {watch("job") === "นักเรียน" && (
                <TextInput
                  label="คณะที่อยากเข้ามากที่สุด ณ ปัจจุบัน"
                  name="school.faculty"
                  ref={register({ required: true })}
                  forms={forms}
                />
              )}

              <Checks
                label="ท่านทราบข่าวเกี่ยวกับการจัดงานนี้จากช่องทางใด"
                name="referrer"
                options={[
                  "Facebook",
                  "Instagram (IG story)",
                  "เพื่อนบอก",
                  "พ่อแม่บอก",
                  "เว็บไซต์ MDCU Open House",
                  "ฝ่ายแนะแนวของโรงเรียน",
                  "โปสเตอร์ตามสถาบันสอนพิเศษ"
                ]}
                ref={register({ required: true })}
                forms={forms}
                others
              />

              <Checks
                label="สิ่งที่คาดหวังว่าจะได้รับจากการมาร่วมงานนี้"
                name="expectation"
                options={[
                  "ความรู้เกี่ยวกับโรคและวิธีรักษา",
                  "ความรู้เกี่ยวกับนวัตกรรมในการรักษาผู้ป่วยแบบใหม่",
                  "ได้พูดคุยกับอาจารย์แพทย์",
                  "ข้อมูลเกี่ยวกับการเรียนต่อในคณะแพทยศาสตร์ จุฬาฯ",
                  "ข้อมูลเกี่ยวกับการศึกษาต่อในวิชาแพทยศาสตร์",
                  "มีเกมส์และกิจกรรมลุ้นรางวัลให้ได้เข้าร่วม"
                ]}
                ref={register({ required: true })}
                forms={forms}
                others
              />

              <div className="flex items-center justify-end">
                <button
                  className="my-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
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

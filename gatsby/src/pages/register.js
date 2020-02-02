import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Spinner from "../components/spinner";
import { TextInput, RadioGroup, Checks, Select } from "../components/inputs";
import useUser from "../stores/user";

const provinces = [
  "กรุงเทพมหานคร",
  "ต่างประเทศ",
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

const RegisterPage = ({ location }) => {
  const firestoreUserRef = useUser(state => state.firestoreUserRef);
  const [submitting, setSubmitting] = useState(false);

  const forms = useForm();
  const { register, handleSubmit, watch } = forms;

  const onSubmit = data => {
    setSubmitting(true);
    firestoreUserRef.update({
      name: data.name
    });
    const registrationData = {
      gender: data.gender,
      age: Number(data.age),
      job: data.job,
      province: data.province,
      referrer: data.referrer,
      expectation: data.expectation
    };
    if (data.school) {
      registrationData.school = data.school;
    }
    if (data.university) {
      registrationData.university = data.university;
    }
    if (data.parent) {
      registrationData.parent = data.parent;
    }
    if (data.referrer_others) {
      registrationData.referrer_others = data.referrer_others;
    }
    if (data.expectation_others) {
      registrationData.expectation_others = data.referrer_others;
    }
    firestoreUserRef
      .collection("userData")
      .doc("registration")
      .set(registrationData);
  };

  const schoolForm = (
    <>
      <Select
        label="ระดับชั้น"
        name="school.grade"
        options={[
          "มัธยมศึกษาปีที่ 6",
          "มัธยมศึกษาปีที่ 5",
          "มัธยมศึกษาปีที่ 4",
          "มัธยมศึกษาปีที่ 3",
          "มัธยมศึกษาปีที่ 2",
          "มัธยมศึกษาปีที่ 1",
          "ประถมศึกษาตอนปลาย",
          "ประถมศึกษาตอนต้น หรือ ต่ำกว่า",
          "อื่น ๆ"
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
        options={[
          "ปี 1",
          "ปี 2",
          "ปี 3",
          "ปี 4",
          "ปี 5",
          "ปี 6",
          "ปริญญาโท",
          "ปริญญาเอก",
          "อื่น ๆ"
        ]}
        ref={register({ required: true })}
        forms={forms}
      />
      <TextInput
        label="คณะ"
        name="university.faculty"
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
        name="parent.occupation"
        ref={register({ required: true })}
        forms={forms}
      />
    </>
  );

  return (
    <Layout location={location} requiredAuth>
      <SEO title="กรอกข้อมูลส่วนตัว" />
      <div className="w-full max-w-lg mx-auto md:shadow-md rounded p-3 sm:p-4 md:p-5 mt-8 mb-12">
        {submitting ? (
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
                  "ผู้ปกครอง/บุคคลทั่วไป"
                ]}
                ref={register({ required: true })}
                forms={forms}
              />

              {watch("job") === "นักเรียน" && schoolForm}
              {watch("job") === "นิสิต/นักศึกษา" && universityForm}
              {watch("job") === "ผู้ปกครอง/บุคคลทั่วไป" && parentForm}

              <Select
                label="จังหวัดที่พักอาศัย"
                name="province"
                options={provinces}
                ref={register({ required: true })}
                forms={forms}
              />

              {watch("job") === "นักเรียน" && (
                <>
                  <TextInput
                    label="คณะที่อยากเข้ามากที่สุด ณ ปัจจุบัน"
                    name="school.desiredFaculty"
                    ref={register({ required: true })}
                    forms={forms}
                  />
                  <TextInput
                    label="มหาวิทยาลัยที่อยากเข้ามากที่สุด ณ ปัจจุบัน"
                    name="school.desiredUniversity"
                    ref={register({ required: true })}
                    forms={forms}
                  />
                </>
              )}

              <Checks
                label="ท่านทราบข่าวเกี่ยวกับการจัดงานนี้จากช่องทางใด"
                name="referrer"
                options={[
                  "Facebook",
                  "Instagram",
                  "เพื่อน",
                  "พ่อแม่",
                  "บุตรหลาน",
                  "เว็บไซต์ MDCU Open House",
                  "ฝ่ายแนะแนวของโรงเรียน",
                  "โปสเตอร์บริเวณสถาบันสอนพิเศษ"
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
                  "การสนทนากับอาจารย์แพทย์",
                  "ข้อมูลเกี่ยวกับการศึกษาต่อในวิชาแพทยศาสตร์",
                  "ข้อมูลเกี่ยวกับการศึกษาต่อในคณะแพทยศาสตร์ จุฬาฯ",
                  "การเล่นเกมส์และกิจกรรมลุ้นรางวัลภายในงาน"
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

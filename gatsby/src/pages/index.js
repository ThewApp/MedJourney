import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Cover from "../components/cover";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Cover />
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center mt-6">
      <p className="max-w-sm mx-4 my-6">
        กิจกรรมสุดพิเศษ 2 วันเต็ม ที่จะทำให้ทุก ๆ คนได้รู้ลึก รู้จริง
        รู้ทุกเรื่องเกี่ยวกับคณะแพทย์ จุฬาฯ รับรองว่าหาจากที่ไหนไม่ได้อีกแน่นอน
      </p>
      <div className="max-w-sm rounded overflow-hidden shadow-md mx-4 my-6">
        <div className="px-6 py-6">
          <div className="font-bold text-xl mb-1">วันที่</div>
          <p className="text-gray-700">
            <span role="img" aria-label="Spiral Calendar">
              🗓
            </span>{" "}
            21 - 22 มีนาคม 2563
          </p>
        </div>
        <div className="px-6 py-6">
          <div className="font-bold text-xl mb-1">สถานที่</div>
          <p className="text-gray-700">
            <span role="img" aria-label="Map Pin">
              📍
            </span>{" "}
            อาคารแพทยพัฒน์ คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>
      </div>
    </div>
    <div className="text-center py-24 md:py-40 px-4">
      <h2 className="text-2xl md:text-4xl">เปิดลงทะเบียน <span className="whitespace-no-wrap">ปลายเดือนกุมภาฯ นี้</span></h2>
    </div>
  </Layout>
);

export default IndexPage;

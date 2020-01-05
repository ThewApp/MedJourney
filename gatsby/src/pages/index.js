import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center my-6">
      <p className="max-w-sm mx-4 mb-4">
        กิจกรรมสุดพิเศษ 2 วันเต็ม ที่จะทำให้ทุก ๆ คนได้รู้ลึก รู้จริง
        รู้ทุกเรื่องเกี่ยวกับคณะแพทย์ จุฬาฯ รับรองว่าหาจากที่ไหนไม่ได้อีกแน่นอน
      </p>
      <div className="max-w-sm rounded overflow-hidden shadow-md mx-4">
        <div className="px-6 py-2 md:py-4">
          <div className="font-bold text-xl mb-1">วันที่</div>
          <p className="text-gray-700">
          🗓 21 - 22 มีนาคม 2563
          </p>
        </div>
        <div className="px-6 py-2 md:py-4">
          <div className="font-bold text-xl mb-1">สถานที่</div>
          <p className="text-gray-700">
          📍 อาคารแพทยพัฒน์ คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default IndexPage;

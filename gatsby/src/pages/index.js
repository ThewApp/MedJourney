import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Cover from "../components/cover";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Cover />
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center mt-6">
      <div className="max-w-sm mx-4 my-6">
        <h1 className="text-lg md:text-2xl text-primary-700 mb-4">
          เปิดรั้วคณะแพทยศาสตร์{" "}
          <span className="whitespace-no-wrap">จุฬาลงกรณ์มหาวิทยาลัย</span>
        </h1>
        <p>
          กิจกรรมสุดพิเศษ 2 วันเต็ม ที่จะทำให้ทุก ๆ คนได้รู้ลึก รู้จริง
          รู้ทุกเรื่องเกี่ยวกับคณะแพทย์ จุฬาฯ
          รับรองว่าหาจากที่ไหนไม่ได้อีกแน่นอน
        </p>
      </div>
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
    <div className="container mx-auto text-center py-24 md:py-40 px-4 relative">
      <h2 className="text-2xl md:text-4xl">
        เปิดลงทะเบียนออนไลน์{" "}
        <span className="whitespace-no-wrap">ปลายเดือนกุมภาพันธ์นี้</span>
      </h2>
      <svg
        className="w-16 m-4 md:m-6 md:w-32 lg:w-40 absolute right-0 bottom-0 fill-current text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 511.999 511.999"
      >
        <path d="M125.768 153.902C56.548 153.902.233 210.217.233 279.437c0 42.977 20.444 89.185 60.765 137.341a435.236 435.236 0 0017.69 19.834c-26.034 7.106-41.665 19.873-41.665 34.774 0 26.379 45.722 40.613 88.741 40.613 43.02 0 88.741-14.235 88.741-40.613 0-14.889-15.626-27.659-41.643-34.768 10.394-10.973 21.578-23.883 32.19-38.283a7.508 7.508 0 10-12.088-8.907c-12.812 17.387-26.68 32.667-38.781 44.804a7.506 7.506 0 00-3.274 3.249c-10.84 10.653-19.962 18.556-25.138 22.874-5.119-4.276-14.102-12.072-24.803-22.586a7.51 7.51 0 00-3.763-3.739c-34.007-34.205-81.957-93.301-81.957-154.591 0-60.94 49.579-110.519 110.519-110.519s110.519 49.579 110.519 110.519c0 26.613-9.068 55.353-26.952 85.422a7.508 7.508 0 0012.906 7.676c19.284-32.424 29.062-63.746 29.062-93.098.001-69.222-56.314-125.537-125.534-125.537zm-4.595 322.069a7.494 7.494 0 004.595 1.57 7.496 7.496 0 004.595-1.57c.921-.713 13.467-10.497 30.19-26.848 25.322 5.164 38.938 15.107 38.938 22.264 0 5.345-7.326 11.651-19.119 16.456-14.464 5.895-33.857 9.142-54.607 9.142-45.006 0-73.726-15.162-73.726-25.598 0-7.167 13.62-17.105 38.956-22.269 16.816 16.448 29.38 26.235 30.178 26.853z" />
        <path d="M125.768 224.854c-11.875 0-23.167 3.749-32.655 10.842a7.51 7.51 0 00-1.518 10.509 7.511 7.511 0 0010.509 1.518c6.871-5.137 15.054-7.853 23.663-7.853 21.817 0 39.566 17.749 39.566 39.567 0 21.817-17.749 39.566-39.566 39.566s-39.566-17.75-39.566-39.566c0-3.723.515-7.404 1.53-10.938a7.508 7.508 0 00-5.144-9.288 7.513 7.513 0 00-9.288 5.145 54.663 54.663 0 00-2.112 15.081c0 30.096 24.485 54.582 54.582 54.582 30.096 0 54.582-24.485 54.582-54.582-.001-30.097-24.487-54.583-54.583-54.583zM452.958 218.121a331.987 331.987 0 0011.701-13.229c31.258-37.333 47.107-73.222 47.107-106.673C511.766 44.062 467.705 0 413.547 0c-39.563 0-75.086 23.546-90.497 59.986a7.507 7.507 0 003.989 9.839 7.509 7.509 0 009.839-3.989c13.058-30.872 43.152-50.821 76.669-50.821 45.879 0 83.204 37.326 83.204 83.205 0 62.043-65.138 121.484-83.207 136.775-3.982-3.365-10.25-8.873-17.599-16.077a7.498 7.498 0 00-3.339-3.318c-25.923-26.101-62.263-70.968-62.263-117.38a7.508 7.508 0 00-15.016 0c0 33.45 15.849 69.339 47.108 106.673a333.897 333.897 0 0011.695 13.223c-19.354 5.815-30.527 15.713-30.527 27.632 0 10.052 8.154 18.911 22.962 24.944 12.67 5.163 29.355 8.007 46.981 8.007 17.625 0 34.31-2.844 46.981-8.007 14.805-6.034 22.959-14.893 22.959-24.945-.001-11.897-11.182-21.804-30.528-27.626zm-39.413 45.561c-35.539 0-54.926-11.848-54.926-17.936 0-3.966 8.819-11.224 27.651-15.228 12.671 12.329 22.076 19.655 22.683 20.126a7.496 7.496 0 004.595 1.57 7.498 7.498 0 004.595-1.57c.607-.469 10.01-7.796 22.681-20.124 8.39 1.789 15.658 4.41 20.744 7.506 4.323 2.634 6.904 5.52 6.904 7.72-.002 6.088-19.389 17.936-54.927 17.936z" />
        <path d="M413.547 54.532c-24.089 0-43.688 19.598-43.688 43.689 0 24.089 19.598 43.687 43.688 43.687s43.688-19.597 43.688-43.687c0-24.09-19.598-43.689-43.688-43.689zm.001 72.36c-15.812 0-28.673-12.862-28.673-28.672s12.862-28.673 28.673-28.673c15.81 0 28.673 12.862 28.673 28.673-.001 15.81-12.863 28.672-28.673 28.672zM316.157 238.239h-3.428c-2.496 0-5.004.165-7.458.492a7.509 7.509 0 001.981 14.886 41.745 41.745 0 015.478-.36h3.427v-.001c4.147 0 7.508-3.36 7.508-7.508s-3.361-7.509-7.508-7.509zM291.336 463.496h-.035l-9.916.045a7.508 7.508 0 00.033 15.016h.035l9.916-.045a7.51 7.51 0 007.474-7.542 7.506 7.506 0 00-7.507-7.474zM325.066 335.489h-9.916a7.508 7.508 0 000 15.016h9.916a7.507 7.507 0 007.508-7.508 7.507 7.507 0 00-7.508-7.508zM285.284 253.536a7.51 7.51 0 00-10.609-.428 56.442 56.442 0 00-7.567 8.552 7.51 7.51 0 0012.197 8.76 41.494 41.494 0 015.551-6.275 7.508 7.508 0 00.428-10.609zM331.002 463.314h-.035l-9.915.045a7.509 7.509 0 00.033 15.016h.035l9.915-.045a7.509 7.509 0 00-.033-15.016zM251.671 463.675h-.035l-9.916.045a7.51 7.51 0 00-7.474 7.542 7.507 7.507 0 007.507 7.474h.035l9.916-.045a7.51 7.51 0 007.474-7.542 7.506 7.506 0 00-7.507-7.474zM290.829 329.178a41.434 41.434 0 01-6.593-5.163 7.51 7.51 0 00-10.616.206 7.507 7.507 0 00.206 10.615 56.431 56.431 0 008.991 7.042 7.502 7.502 0 0010.357-2.345 7.507 7.507 0 00-2.345-10.355zM272.373 302.287a41.493 41.493 0 01-.76-7.914l.002-.417a7.506 7.506 0 00-7.42-7.594l-.089-.001a7.508 7.508 0 00-7.506 7.421l-.003.592c0 3.626.349 7.255 1.037 10.786a7.508 7.508 0 1014.739-2.873zM364.733 335.489h-9.916a7.508 7.508 0 000 15.016h9.916a7.508 7.508 0 000-15.016zM485.274 350.775a71.487 71.487 0 00-9.192-6.162c-3.609-2.036-8.19-.757-10.226 2.856a7.507 7.507 0 002.856 10.226 56.631 56.631 0 017.255 4.866 7.473 7.473 0 004.648 1.616 7.508 7.508 0 004.659-13.402zM457.405 468.694c-.57-4.107-4.366-6.982-8.465-6.41-2.459.34-4.977.519-7.488.529l-1.405.007a7.51 7.51 0 00.035 15.016h.037l1.402-.007a71.685 71.685 0 009.474-.67 7.508 7.508 0 006.41-8.465zM490.54 447.581a7.505 7.505 0 00-10.614-.258 56.716 56.716 0 01-6.778 5.523 7.511 7.511 0 00-1.893 10.449 7.501 7.501 0 006.177 3.231 7.476 7.476 0 004.271-1.338 71.82 71.82 0 008.58-6.992 7.508 7.508 0 00.257-10.615zM505.152 411.118a7.51 7.51 0 00-8.767 5.988 56.243 56.243 0 01-2.28 8.428 7.509 7.509 0 0014.145 5.043 71.2 71.2 0 002.893-10.692 7.51 7.51 0 00-5.991-8.767zM509.612 386.984a70.893 70.893 0 00-3.886-10.384 7.509 7.509 0 00-13.608 6.349 55.798 55.798 0 013.061 8.177 7.512 7.512 0 007.213 5.439 7.51 7.51 0 007.22-9.581zM404.399 335.489h-9.916a7.508 7.508 0 000 15.016h9.916a7.508 7.508 0 000-15.016zM370.668 463.134h-.035l-9.916.045a7.509 7.509 0 00.033 15.016h.035l9.916-.045a7.508 7.508 0 00-.033-15.016zM444.395 335.561a71.127 71.127 0 00-3.196-.071h-7.051a7.508 7.508 0 000 15.016h7.051v-.001c.849 0 1.693.019 2.532.056a7.506 7.506 0 007.832-7.167 7.507 7.507 0 00-7.168-7.833zM410.333 462.955h-.035l-9.916.045a7.509 7.509 0 00.033 15.016h.035l9.916-.045a7.51 7.51 0 007.474-7.542 7.506 7.506 0 00-7.507-7.474z" />
      </svg>
    </div>
  </Layout>
);

export default IndexPage;

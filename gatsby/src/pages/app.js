import React from "react";
import { Link } from "gatsby";
// import QRCode from "qrcode";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Spinner from "../components/spinner";
import useUser from "../stores/user";

const AppPage = ({ location }) => {
  const firestoreUser = useUser(state => state.firestoreUser);
  // const [qrcodeUrl, setqrcodeUrl] = useState();

  // useEffect(() => {
  //   if (firestoreUser && firestoreUser.shortId) {
  //     QRCode.toDataURL(
  //       firestoreUser.shortId,
  //       { margin: 2, scale: 50 },
  //       (err, url) => {
  //         setqrcodeUrl(url);
  //       }
  //     );
  //   }
  // }, [firestoreUser]);

  return (
    <Layout location={location} requiredAuth>
      <SEO title="App" />
      {firestoreUser ? (
        <div className="container mx-auto my-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-1/2 sm:w-1/3 md:w-1/4 mx-auto my-4"
            viewBox="0 0 256 256"
          >
            <path
              d="M205 252H39c-6 0-10-4-10-10V14c0-6 4-10 10-10h166c5 0 10 4 10 10v228c0 6-5 10-10 10z"
              fill="#f4efed"
            />
            <path
              d="M205 4h-10c5 0 10 4 10 10v228c0 6-5 10-10 10h10c5 0 10-4 10-10V14c0-6-5-10-10-10z"
              fill="#d6d1cf"
            />
            <path
              d="M39 252h10c-6 0-10-4-10-10V14c0-6 4-10 10-10H39c-6 0-10 4-10 10v228c0 6 4 10 10 10z"
              fill="#fff"
            />
            <path
              d="M205 254H39c-7 0-12-5-12-12V14c0-7 5-12 12-12h166c6 0 12 5 12 12v228c0 7-6 12-12 12zM39 6c-5 0-8 4-8 8v228c0 4 3 8 8 8h166c4 0 8-4 8-8V14c0-4-4-8-8-8z"
              fill="#547c58"
            />
            <path
              d="M39 69l-2-2V55a2 2 0 014 0v12l-2 2zM184 130H59a2 2 0 010-4h125a2 2 0 010 4zM184 172H59a2 2 0 010-4h125a2 2 0 010 4zM184 215H59a2 2 0 010-4h125a2 2 0 010 4z"
              fill="#547c58"
            />
            <path
              d="M209 38h12V27a6 6 0 10-12 0z"
              fill="#ea7c68"
              className="active-path"
            />
            <path
              d="M221 38h-13c-3 0-6 3-6 6v26h25V44c0-3-3-6-6-6z"
              fill="#f4efed"
            />
            <path
              d="M221 38h-6c3 0 6 3 6 6v26h6V44c0-3-3-6-6-6z"
              fill="#d6d1cf"
            />
            <path
              d="M208 38h6c-3 0-6 3-6 6v26h-6V44c0-3 3-6 6-6z"
              fill="#fff"
            />
            <path d="M202 70h25v143h-25z" fill="#a8beaa" />
            <path
              d="M215 213h12l-6 11-6 10-7-10-6-11z"
              fill="#ea7c68"
              className="active-path"
            />
            <path d="M221 70h6v143h-6z" fill="#89a68c" />
            <path d="M202 70h6v143h-6z" fill="#d7e2d8" />
            <path
              d="M227 215h-25l-2-2V70l2-2h25l2 2v143l-2 2zm-23-4h21V72h-21z"
              fill="#547c58"
            />
            <path
              d="M227 72h-25l-2-2V44c0-4 4-8 8-8h13c5 0 8 4 8 8v26l-2 2zm-23-4h21V44c0-2-2-4-4-4h-13c-2 0-4 2-4 4v24z"
              fill="#547c58"
            />
            <path
              d="M221 40h-12l-2-2V27a8 8 0 0116 0v11l-2 2zm-10-4h8v-9a4 4 0 00-8 0zM215 236l-2-1-13-21a2 2 0 012-3h25a2 2 0 012 3l-13 21-1 1zm-9-21l9 15 9-15zM193 127l-2-2V74c0-3 3-6 6-6h5a2 2 0 010 4h-5l-2 2v51l-2 2z"
              fill="#547c58"
            />
            <path
              d="M227 80h-25a2 2 0 010-4h25a2 2 0 010 4zM215 236c-1 0-2 0-2-2v-12a2 2 0 014 0v12c0 2-1 2-2 2z"
              fill="#547c58"
            />
            <g>
              <circle
                cx="121.7"
                cy="66.7"
                fill="#ea7c68"
                r="48"
                className="active-path"
              />
            </g>
            <g>
              <path
                d="M122 19h-4a48 48 0 010 96h4a48 48 0 000-96z"
                fill="#e6674f"
              />
            </g>
            <g>
              <path
                d="M122 115h4a48 48 0 010-96h-4a48 48 0 000 96z"
                fill="#f28f7c"
              />
            </g>
            <g>
              <path d="M117 94L90 68l10-9 18 17 29-26 9 10z" fill="#a8beaa" />
            </g>
            <g>
              <path
                d="M117 96l-1-1-27-25a2 2 0 010-3l9-10h3l17 16 28-25a2 2 0 012 0l9 11v2l-38 34-2 1zM93 68l24 23 36-31-6-7-28 24h-3l-16-16z"
                fill="#547c58"
              />
            </g>
            <g>
              <path
                d="M122 117a50 50 0 110-100 50 50 0 010 100zm0-96a46 46 0 100 92 46 46 0 000-92z"
                fill="#547c58"
              />
            </g>
          </svg>
          {/* <img
            alt="QR Code"
            aria-describedby="shortId"
            className="w-1/2 sm:w-1/3 md:w-1/4 mx-auto"
            src={qrcodeUrl}
          />
          <p id="shortId" className="text-center">
            {firestoreUser.shortId}
          </p> */}
          <h1 className="text-2xl my-4">ลงทะเบียนสำเร็จแล้ว</h1>
          <p className="my-4">สามารถจองรอบกิจกรรมได้ 26 - 29 กุมภาพันธ์นี้</p>
          <Link to="/events#all" className="mb-2 block underline">
            ดูกิจกรรมทั้งหมด
          </Link>
          <Link to="/events#bookings" className="mb-2 block underline">
            ดูกิจกรรมที่เปิดให้จองรอบ
          </Link>
          <Link to="/" className="mb-2 block underline">
            กลับหน้าหลัก
          </Link>
        </div>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default AppPage;

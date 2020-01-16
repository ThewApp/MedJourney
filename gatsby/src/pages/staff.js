import React, { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";

import Layout from "../components/layout";
import SEO from "../components/seo";

const AppPage = () => {
  const video = useRef();
  const canvas = useRef();
  const [videoCanPlayThrough, setVideoCanPlayThrough] = useState(false);
  const [code, setCode] = useState();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        video.current.srcObject = stream;
        video.current.setAttribute("playsinline", true);
        video.current.play();
        video.current.addEventListener("canplaythrough", () => {
          setVideoCanPlayThrough(true);
        });
      });
  }, []);

  useEffect(() => {
    if (videoCanPlayThrough) {
      canvas.current.width = video.current.videoWidth;
      canvas.current.height = video.current.videoHeight;

      let timeout;
      let animationFrame;
      function tick() {
        canvas.current
          .getContext("2d")
          .drawImage(
            video.current,
            0,
            0,
            canvas.current.width,
            canvas.current.height
          );
        const imageData = canvas.current
          .getContext("2d")
          .getImageData(0, 0, canvas.current.width, canvas.current.height);
        const qr = jsQR(imageData.data, imageData.width, imageData.height);
        const result = qr ? qr.data : null;
        if (result) {
          timeout = setTimeout(tick, 1000);
        } else {
          animationFrame = requestAnimationFrame(tick);
        }
        setCode(result);
      }

      animationFrame = requestAnimationFrame(tick);

      return () => {
        clearTimeout(timeout);
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [videoCanPlayThrough]);
  return (
    <Layout>
      <SEO title="App" />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video className="container mx-auto" ref={video} track="Camera" />
      <canvas className="hidden" ref={canvas} />
      <p>Code: {code}</p>
    </Layout>
  );
};

export default AppPage;

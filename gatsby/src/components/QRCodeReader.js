import React, { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";

const QRCodeReader = ({ setCode, ...props }) => {
  const video = useRef();
  const canvas = useRef();
  const [videoCanPlayThrough, setVideoCanPlayThrough] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  useEffect(() => {
    let tracks = [];
    let unmounted = false;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode } })
      .then(stream => {
        if (unmounted) {
          stream.getTracks().forEach(track => track.stop());
        } else {
          tracks = stream.getTracks();
          video.current.srcObject = stream;
          video.current.setAttribute("playsinline", true);
          video.current.play();
          video.current.addEventListener("canplaythrough", () => {
            setVideoCanPlayThrough(true);
          });
        }
      });
    return () => {
      tracks.forEach(track => track.stop());
      unmounted = true;
    };
  }, [facingMode]);

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
        const result = qr ? qr.data : "";
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
  }, [videoCanPlayThrough, setCode]);

  function toggleFacingMode() {
    facingMode === "environment"
      ? setFacingMode("user")
      : setFacingMode("environment");
  }

  return (
    <div className="mx-auto p-4" {...props}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="w-full cursor-pointer"
        ref={video}
        onClick={toggleFacingMode}
      />
      <canvas className="hidden" ref={canvas} />
    </div>
  );
};

export default QRCodeReader;

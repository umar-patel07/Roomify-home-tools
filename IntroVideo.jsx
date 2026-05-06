import React from "react";
import "./IntroVideo.css";

const IntroVideo = ({ onFinish }) => {
  return (
    <div className="intro-video-container">
      <video
        autoPlay
        muted
        playsInline
        onEnded={onFinish}  // Only finish when video ends
        className="intro-video"
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="skip-btn" onClick={onFinish}>Skip</button>
    </div>
  );
};

export default IntroVideo;

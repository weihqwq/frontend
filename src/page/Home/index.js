import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom"; // 使用 React Router 进行页面跳转

import BottomButton from "../../components/BottomButton/BottomButton";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import CivilServiceExamSection from "../../components/CivilServiceExamSection/CivilServiceExamSection";

//css
import "./index.css";

const Home = () => {
  const [activeButton, setActiveButton] = useState("home");

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const jwt = queryParams.get("jwt");

  console.log({ jwt });

  const handleButtonClick = (button) => {
    // 处理按钮点击逻辑
    setActiveButton(button);
  };

  return (
    <div className="home-container">
      <div className="carousel-container">
        {/* 顶部图片轮播 */}
        <ImageSlider />
      </div>
      <div className="exam-section-container">
        {/* 公务员笔试板块 */}
        <CivilServiceExamSection />
      </div>
      <BottomButton
        activeButton={activeButton}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default Home;

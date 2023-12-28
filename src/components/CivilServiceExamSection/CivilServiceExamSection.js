import React from "react";
import "./CivilServiceExamSection.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const CivilServiceExamSection = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const jwt = queryParams.get("jwt");

  return (
    <div className="civil-service-exam-section">
      {/* 公务员笔试标题 */}
      <div className="exam-divider-text">公务员笔试</div>

      {/* 圆角区域 */}
      <div className="exam-images">
        <div className="rounded-area">
          <img
            onClick={() => navigate(`/Administrative?jwt=${jwt}`)}
            src={process.env.PUBLIC_URL + "/images/xingce.png"}
            alt="行测"
          />
          <div className="exam-buttons">
            <button onClick={() => navigate(`/Administrative?jwt=${jwt}`)}>
              行测
            </button>
          </div>
        </div>
        <div className="rounded-area">
          <img
            onClick={() => navigate(`/Deuteronomy?jwt=${jwt}`)}
            src={process.env.PUBLIC_URL + "/images/shenlun.png"}
            alt="申论"
          />
          <div className="exam-buttons">
            <button onClick={() => navigate(`/Deuteronomy?jwt=${jwt}`)}>
              {" "}
              申论
            </button>
          </div>
        </div>
      </div>

      {/* 更多资料标题 */}
      {/* <div className="exam-divider-text">更多资料</div> */}

      {/* 四个圆角图片 */}
      {/* <div className="exam-images">
        <div className="rounded-area">
          <img src={process.env.PUBLIC_URL + '/images/1.png'} alt="Image 1" />
        </div>
        <div className="rounded-area">
          <img src={process.env.PUBLIC_URL + '/images/2.png'} alt="Image 2" />
        </div>
        <div className="rounded-area">
          <img src={process.env.PUBLIC_URL + '/images/3.png'} alt="Image 3" />
        </div>
        <div className="rounded-area">
          <img src={process.env.PUBLIC_URL + '/images/4.png'} alt="Image 4" />
        </div>
      </div> */}
    </div>
  );
};

export default CivilServiceExamSection;

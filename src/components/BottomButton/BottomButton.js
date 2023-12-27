import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './BottomButton.css';

const BottomButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === `/${path}`;

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const jwt = queryParams.get('jwt');

  const handleButtonClick = (path) => {
    navigate(`/${path}?jwt=${jwt}`);
  };

  return (
    <div className="bottom-button">
      <button
        className={`bottom-button-button ${isActive('home') ? 'active' : ''}`}
        onClick={() => handleButtonClick('home')}
      >
        主页
      </button>
      
      <button
        className={`bottom-button-button ${isActive('myPage') ? 'active' : ''}`}
        onClick={() => handleButtonClick('myPage')}
      >
        我的
      </button>
    </div>
  );
};

export default BottomButton;

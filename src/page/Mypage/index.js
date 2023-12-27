
import React, { useState, useEffect } from 'react';

import { useNavigate,useLocation } from 'react-router-dom'; // 使用 React Router 进行页面跳转

import BottomButton from '../../components/BottomButton/BottomButton';

import "./index.css"

const MyPage = () => {
  const navigate = useNavigate()
  const [activeButton, setActiveButton] = useState('home');

  const handleButtonClick = (button) => {
    // 处理按钮点击逻辑
    setActiveButton(button);
  };
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const jwt = queryParams.get('jwt');

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 发起获取用户信息的请求
    fetchUserInfo();
  }, []); // 空数组表示仅在组件挂载时执行

  const fetchUserInfo = async () => {
    try {
      // 发起请求，替换为你的后端接口地址
      const response = await fetch('https://testsystem.zeabur.app/admin/userinfo', {
        method: 'POST',
        headers: {
          Authorization: jwt,
        },
        // 如果有请求体数据，可以在这里添加
        body: JSON.stringify({ }),
      });

      if (response.ok) {
        const data = await response.json();
        // 将获取到的用户信息存储在状态中
        setUserInfo(data.data);
      } else {
        console.error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  
   
  
    const handleLogout = () => {
      // 清除用户信息的逻辑，例如清除本地存储的 token
  
      // 导航到登录页
      navigate('/');
    };
  
  
  return (
    <div className="user-profile">
      {/* 用户信息区域 */}
      <div className="user-info-container">
        <img src={process.env.PUBLIC_URL + '/images/head.jpg'} alt="User Avatar" className="avatar" />
        <div className="user-details">
          <h3>{userInfo?.name}</h3>
          <p>{userInfo?.email}</p>
        </div>
      </div>

      <div className="user-actions">
        <button>我的预约</button>
        <button>专家打分</button>
        <button>我的关注</button>
        <button>我的消息</button>
        <button>系统通知</button>
        <button>历史记录</button>
        <button>我的设置</button>
        <button onClick={handleLogout}>退出账号</button>
      </div>
      <BottomButton activeButton={activeButton} onButtonClick={handleButtonClick} />
    </div>
   

  );
};

export default MyPage;

// components/Login.js

import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      // 发起登录请求
      const response = await fetch('https://testsystem.zeabur.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // 解析后端返回的数据
      const data = await response.json();

      // 检查登录是否成功
      if (data.status===0) {
        // 登录成功，可以在这里处理成功登录后的逻辑
        const jwt = data.token
        console.log('登录成功');
        console.log({jwt})
        navigate(`/home?jwt=${jwt}`);

      } else if(data.message=== '无效邮箱，用户名或密码'){
        // 处理登录失败的情况
        setError('无效邮箱或密码');
          setTimeout(() => {
            setError(null);
          }, 2000);
      }else if(data.message === '此邮箱未注册'){
        setError('此邮箱未注册');
        setTimeout(() => {
          setError(null);
        }, 2000);
      }else if(data.message ==='密码错误'){
        setError('密码错误');
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (error) {
      console.error('发生错误', error);
    }
  };

  return (
    <div className="form-container">
      <h2 >登录</h2>
      <p>请正确填写以下信息以登录账户。</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label htmlFor="email">
        <span >电子邮箱：</span>
      </label>
      <input type="email" id="email" value={email} onChange={handleEmailChange} className="input-field"/>
      <br></br>

      <label htmlFor="password">
        <span >密码：</span>
      </label>
      <input type="password" id="password" value={password} onChange={handlePasswordChange} className="input-field"/>
      <br></br>

      <button className='button' onClick={handleLogin}>登录</button>

      <div className="options-container">
        <div className="options">
          <Link to="/register">注册账户</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;


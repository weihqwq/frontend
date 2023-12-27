// components/Register.js

import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Register.css'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    try {
      // 发起 API 调用
      const response = await fetch('https://testsystem.zeabur.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      // 解析后端返回的数据
      const data = await response.json();

      // 检查注册是否成功
      if (data.status===0) {
        // 注册成功，进行页面导航
        console.log('注册成功');
        navigate('/'); // 替换为实际注册成功后的页面路径
      } else {
        // 处理注册失败的情况
        if (data.message === '无效邮箱，用户名或密码') {
          setError('无效邮箱，用户名或密码');
          setTimeout(() => {
            setError(null);
          }, 2000);
        } else if (data.message === '此邮箱已注册账号，请更改') {
          setError('此邮箱已注册账号，请更改');
          setTimeout(() => {
            setError(null);
          }, 2000);
        } else {
          setError('未知错误');
        }
      }
    } catch (error) {
      console.error('发生错误', error);
    }
  };
    

  return (
    <div className="form-container">
      <h2 >注册</h2>
      <p>填写以下信息以创建新账户。</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label htmlFor="name">
        <span >用户名：</span>
      </label>
      <input type="text" id="name" value={name} onChange={handleNameChange} className="input-field"/>
      <br></br>

      <label htmlFor="email">
        <span >电子邮件：</span>
      </label>
      <input type="email" id="email" value={email} onChange={handleEmailChange} className="input-field"/>
      <br></br>

      <label htmlFor="password">
        <span >密码：</span>
      </label>
      <input type="password" id="password" value={password} onChange={handlePasswordChange} className="input-field"/>
      <br></br>

      <button className='button' onClick={handleRegister}>注册</button>
      

      <div className="options-container">
        <div className="options">
        <Link to="/">已经有账户?登录</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

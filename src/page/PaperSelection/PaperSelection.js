import React, { useState, useEffect } from 'react';
import {  useNavigate,useLocation } from 'react-router-dom';
import './PaperSelection.css';

const PaperSelection = () => {
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const jwt = queryParams.get('jwt');

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch('https://testsystem.zeabur.app/writtenTest/Paper/get',{
          method: 'GET',
          headers: {
            
            Authorization: jwt
          }
        }
          );
        if (!response.ok) {
          throw new Error(`Failed to fetch papers. Status: ${response.status}`);
        }
        const data = await response.json();
        setPapers(data);
      } catch (error) {
        console.error('获取试卷列表时出错:', error.message);
      }
    };
    fetchPapers();
  }, []);

  const handlePaperClick = (paper) => {
    // 传递试卷数据到 BasicTest，并导航到 BasicTest
    navigate(`/BasicTest/${paper._id}?jwt=${jwt}`, { state: { paper } });
  };

  return (
    <div className="paper-selection-container">
      <button onClick={() => navigate(`/home?jwt=${jwt}`)} className="back-button">
        返回
      </button>
      <div className="title">选择试卷</div>
      <ul className="paper-list">
        {papers.map((paper) => (
          <li key={paper._id} className="paper-item">
            <button onClick={() => handlePaperClick(paper)}>{paper.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaperSelection;

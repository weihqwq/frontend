import React, { useState, useEffect } from 'react';
import {  useNavigate,useLocation } from 'react-router-dom';
import './KindSelection.css';

const KindSelection = () => {
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
      <button onClick={() => navigate(`/Kind1?jwt=${jwt}`)} style={{ width: '50%', height: '100px', fontSize: '32px', backgroundColor: 'lightblue', marginBottom: '20px', borderRadius: '15px',color:'black '  }}>
        数量关系
      </button>
      <button onClick={() => navigate(`/Kind2?jwt=${jwt}`)} style={{ width: '50%', height: '100px', fontSize: '32px', backgroundColor: 'lightgreen', marginBottom: '20px', borderRadius: '15px',color:'black '  }}>
        判断推理
      </button>
      <button onClick={() => navigate(`/Kind3?jwt=${jwt}`)} style={{ width: '50%', height: '100px', fontSize: '32px', backgroundColor: 'lightyellow', marginBottom: '20px', borderRadius: '15px',color:'black '  }}>
        资料分析
      </button>
      <button onClick={() => navigate(`/Kind4?jwt=${jwt}`)} style={{ width: '50%', height: '100px', fontSize: '32px', backgroundColor: 'lightpink', marginBottom: '20px', borderRadius: '15px',color:'black ' }}>
        常识判断
      </button>
    </div>
  );
};

export default KindSelection;

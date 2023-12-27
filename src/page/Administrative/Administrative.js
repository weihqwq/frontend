import React from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import './Administrative.css';

const Administrative = () => {
  const navigate = useNavigate()
  
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const jwt = queryParams.get('jwt');
  console.log({jwt});

  


  return (
    

    <div className="administrative-container">
      {/* 使用 Link 组件将按钮与对应的路由链接起来 */}
      <button onClick={() => navigate(`/home?jwt=${jwt}`)} className="back-button">
        返回
      </button>

      <button onClick={() => navigate(`/PaperSelection?jwt=${jwt}`)} style={{ width: '50%', height: '100px', fontSize: '32px', backgroundColor: 'lightblue', marginBottom: '20px', borderRadius: '15px',color:'black '  }}>
        基础能力测试
      </button>
      <button onClick={() => navigate(`/KindSelection?jwt=${jwt}`)} style={{ width: '50%', height: '100px', fontSize: '32px', backgroundColor: 'lightgreen', marginBottom: '20px', borderRadius: '15px',color:'black '  }}>
        分类训练
      </button>
      <button onClick={() => navigate(`/PaperSelection2?jwt=${jwt}`)} style={{ width: '50%', height: '100px', fontSize: '32px', backgroundColor: 'lightyellow', marginBottom: '20px', borderRadius: '15px',color:'black '  }}>
        限时训练
      </button>
      <button onClick={() => navigate(`/Simulate?jwt=${jwt}`)} style={{ width: '50%', height: '100px', fontSize: '32px', backgroundColor: 'lightpink', marginBottom: '20px', borderRadius: '15px',color:'black ' }}>
        模拟测试
      </button>
    </div>
  );
}
export default Administrative;
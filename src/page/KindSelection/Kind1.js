import React, { useState, useEffect } from 'react';
//import './YourComponent.css'; // 请替换为你的样式文件
import { useNavigate, useLocation } from 'react-router-dom';

const Kind1 = () => {
  const [questions, setQuestions] = useState([]); // 试题数据
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const jwt = queryParams.get('jwt');

  useEffect(() => {
    // 在这里获取试卷数据，示例中假设使用 fetch 方法
    const fetchPaperData = async () => {
        try {
          // 构建请求参数
        const params = {
          // 根据实际情况传递参数
          area: '行测',
          tag: '数量关系',
        };

      // 构建查询字符串
      const queryString = Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

        const response = await fetch(`https://testsystem.zeabur.app/writtenTest/Paper/getByQsTag?${queryString}`, {
          method: 'GET',
          headers: {
            Authorization: jwt,
          },
        });
        console.log(response._id)

        if (!response.ok) {
          throw new Error(`Failed to fetch paper. Status: ${response.status}`);
        }

        const paperData = await response.json();
        setQuestions(paperData[0].questions);
        //console.log(paperData[0]._id)
        //console.log(questions._id)
        // 初始化用户答案
        const initialUserAnswers = {};
        paperData.questions.forEach((q) => {
          initialUserAnswers[q._id] = {
            answerType: q.type === 'choice' ? 'choice' : 'text',
            content: '',
          };
        });
        setUserAnswers(initialUserAnswers);
      } catch (error) {
        console.error('获取试卷数据时出错:', error.message);
      }
    };

    // 调用获取试卷数据的函数
    fetchPaperData();
  }, [jwt]); // 请根据实际情况调整依赖项

  const handleMultipleChoiceAnswer = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        answerType: 'choice',
        content: selectedOption,
      },
    }));
  };

  const handleEssayAnswer = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        answerType: 'text',
        content: answer,
      },
    }));
  };

  const submitAnswers = async () => {
    try {
      // 构建请求对象
      console.log(questions._id)
      const requestBody = {
        paperID: questions[0]._id, // 请替换为实际的试卷 ID
        userID: 'user_id', // 你的用户 ID，这里需要替换为真实的用户 ID
        score: 0, // 这里可以根据需要计算分数
        answers: Object.values(userAnswers),
      };

      // 发送答案到后端
      const response = await fetch('https://testsystem.zeabur.app/writtenTest/Answer/insert', {
        method: 'POST',
        headers: {
          Authorization: jwt,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit answers. Status: ${response.status}`);
      }

      // 处理提交成功后的操作，例如导航到下一个页面
      navigate(`/home?jwt=${jwt}`)
    } catch (error) {
      console.error('提交答案时出错:', error.message);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate(`/home?jwt=${jwt}`)} className="back-button">
        返回
      </button>
      <div className="title">公务员考试系统</div>
      <div className="centered"></div>
      {questions.map((q, index) => (
        <div key={q._id} className="paper">
          <div className="title">{`Question ${index + 1}: ${q.title}`}</div>
          {q.questionType === 'choice' && (
            <ul className="choices">
              {q.choices.map((option, optionIndex) => (
                <li key={optionIndex} className="choice">
                  <input
                    type="radio"
                    name={`question_${q._id}`}
                    value={option}
                    onChange={() => handleMultipleChoiceAnswer(q._id, option)}
                    checked={userAnswers[q._id]?.content === option}
                  />
                  {option}
                </li>
              ))}
            </ul>
          )}
          {q.questionType === 'text' && (
            <textarea
              rows={4}
              placeholder="请输入您的答案"
              value={userAnswers[q._id]?.content || ''}
              onChange={(e) => handleEssayAnswer(q._id, e.target.value)}
            />
          )}
        </div>
      ))}
      <div className="centered">
        <button onClick={submitAnswers}>提交答案</button>
      </div>
    </div>
  );
};


export default Kind1;

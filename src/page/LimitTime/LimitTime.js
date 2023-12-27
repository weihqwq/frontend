import React, { useState, useEffect } from 'react';
import './LimitTime.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const ExamSystem = () => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const { paperId } = useParams();
    const location = useLocation();
    const { state: { paper } } = location;
    const navigate = useNavigate();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const jwt = queryParams.get('jwt');

    useEffect(() => {
        // 处理未选择试卷的情况
        if (!paper) {
            // 如果没有试卷数据，可以进行导航到选择试卷页面等操作
            // 例如：navigate('/paper-selection');
        } else {
            setQuestions(paper.questions);
            // 初始化用户答案
            const initialUserAnswers = {};
            paper.questions.forEach((q) => {
                initialUserAnswers[q._id] = {
                    answerType: q.type === 'choice' ? 'choice' : 'text',
                    content: '',
                };
            });
            setUserAnswers(initialUserAnswers);
        }
    }, [paper, navigate]);

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
            const requestBody = {
                paperID: paperId,
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
            navigate(`/home?jwt=${jwt} `);
        } catch (error) {
            console.error('提交答案时出错:', error.message);
        }
    };


    // 新的状态用于倒计时
    const [timeRemaining, setTimeRemaining] = useState(7200); // 120分钟，以秒为单位

    useEffect(() => {
        // 倒计时
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        // 在组件卸载时清除计时器
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // 处理时间到期，例如导航到提交页面
        if (timeRemaining <= 0) {
            submitAnswers();
        }
    }, [timeRemaining]);

    // 格式化时间为分钟和秒钟
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="container">
            <button onClick={() => navigate(`/home?jwt=${jwt}`)} className="back-button">
                返回
            </button>
            <div className="title">公务员考试系统</div>
            <div className="countdown">剩余时间: {formatTime(timeRemaining)}</div>
            {/* 其他代码，如题目和答案部分 */}
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

export default ExamSystem;

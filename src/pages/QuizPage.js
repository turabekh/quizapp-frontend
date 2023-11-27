import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Radio, Card, Button, message, Spin, List, Modal } from 'antd';
import { AuthContext } from '../context/AuthContext';



const QuizPage = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const { get_user_token } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchQuiz = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://turaboyformisc.pythonanywhere.com/api/courses/quizzes/${quizId}/`);
                setQuiz(response.data);
                initializeAnswers(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
                message.error('Failed to load quiz.');
            }
            setLoading(false);
        };

        fetchQuiz();
    }, [quizId]);

    
    const cardStyle = {
        margin: "auto",
        marginBottom: 16,
    };

    

    const initializeAnswers = (quizData) => {
        const initialAnswers = {};
        quizData.questions.forEach(question => {
            initialAnswers[question.id] = null;
        });
        setAnswers(initialAnswers);
    };

    const handleAnswerChange = (questionId, event) => {
        setAnswers({ ...answers, [questionId]: event.target.value });
    };

    const handleSubmit = () => {
        const unansweredQuestions = Object.values(answers).filter(answer => answer === null).length;

        if (unansweredQuestions > 0) {
            Modal.confirm({
                title: 'Confirm Submission',
                content: `You have ${unansweredQuestions} unanswered questions. Please answer those questions before submitting.`,
                onOk() {
                    console.log('Submission cancelled');
                },
                onCancel() {
                    console.log('Submission cancelled');
                },
            });
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = async () => {
        const answerSubmissions = Object.entries(answers).map(([questionId, chosenAnswerId]) => ({
            question: parseInt(questionId),
            chosen_answer: chosenAnswerId
        }));

        try {
            await axios.post(
                `https://turaboyformisc.pythonanywhere.com/api/courses/quizzes/submit/${quizId}/`,
                answerSubmissions,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${get_user_token()}`
                        // Include auth headers if needed
                    },
                }
            );
            message.success('Quiz submitted successfully');
            // Navigate to results page or handle the response as needed
            navigate(`/quizzes/results/${quizId}/`);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            message.error('Failed to submit quiz.');
        }
    };

    if (loading) return <Spin />;

    return (
        <div>
            {quiz ? (
                <>
                    <h1 style={{ textAlign: "center" }}>{quiz.title}</h1>

                    {quiz?.questions?.map((question) => (
                        <Card
                            title={
                                <span className='title-text'>{question?.text}</span>
                            }
                            key={question.id}
                            style={cardStyle}
                            className='card-width'
                        >
                            <Radio.Group onChange={(e) => handleAnswerChange(question.id, e)}>
                                <List
                                    dataSource={question.choices}
                                    renderItem={(choice) => (
                                        <List.Item key={choice.id}>
                                            <Radio key={choice.id} value={choice.id}>{choice.text}</Radio>
                                        </List.Item>
                                    )}
                                />
                            </Radio.Group>
                        </Card>
                    ))}
                    <div style={{width: "80%", margin: "auto"}}>
                        <Button type="primary" onClick={handleSubmit} block>Submit Quiz</Button>
                    </div>
                </>
            ) : (
                <p>Quiz not found.</p>
            )}
        </div>
    );
};

export default QuizPage;

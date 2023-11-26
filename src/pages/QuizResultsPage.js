import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Card, List, Tag } from 'antd';
import { AuthContext } from '../context/AuthContext';

const QuizResultsPage = () => {
    const { quizId } = useParams();
    const [quizResults, setQuizResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const { get_user_token } = useContext(AuthContext);

    useEffect(() => {
        const fetchQuizResults = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://turaboyformisc.pythonanywhere.com/api/courses/quizzes/results/${quizId}/`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${get_user_token()}`
                        // Include auth headers if needed
                    },
                }
                );
                setQuizResults(response.data);
            } catch (error) {
                console.error('Error fetching quiz results:', error);
                // Handle error
            }
            setLoading(false);
        };

        fetchQuizResults();
    }, [quizId, get_user_token]);

    if (loading) return <Spin />;

    return (
        <div>
            {quizResults ? (
                <>
                    <h1>Quiz Results: {quizResults.quiz.title}</h1>
                    <List
                        itemLayout="horizontal"
                        dataSource={quizResults?.submissions}
                        renderItem={submission => (
                            <List.Item>
                                <Card title={`Question: ${submission.question.text}`}>
                                    <p>Your answer: {submission.chosen_answer.text}</p>
                                    <Tag color={submission.chosen_answer.is_correct ? 'green' : 'red'}>
                                        {submission.chosen_answer.is_correct ? 'Correct' : 'Incorrect'}
                                    </Tag>
                                </Card>
                            </List.Item>
                        )}
                    />
                </>
            ) : (
                <p>Quiz results not found.</p>
            )}
        </div>
    );
};

export default QuizResultsPage;

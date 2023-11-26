import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Spin, message } from 'antd';
import { AuthContext } from '../context/AuthContext';

const GradeBookPage = () => {
    const [gradeData, setGradeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { get_user_token } = useContext(AuthContext);

    useEffect(() => {
        const fetchGrades = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://turaboyformisc.pythonanywhere.com/api/courses/student/grades/', 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${get_user_token()}`
                        // Include auth headers if needed
                    },
                }
                );
                setGradeData(response.data);
            } catch (error) {
                console.error('Error fetching grades:', error);
                message.error('Failed to load grades.');
            }
            setLoading(false);
        };

        fetchGrades();
    }, [get_user_token]);

    const columns = [
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Topic',
            dataIndex: 'topic',
            key: 'topic',
        },
        {
            title: 'Quiz Title',
            dataIndex: 'quizTitle',
            key: 'quizTitle',
        },
        {
            title: 'Attempt Date',
            dataIndex: 'attemptDate',
            key: 'attemptDate',
        },
        {
            title: 'Score (%)',
            dataIndex: 'score',
            key: 'score',
        }
    ];

    return (
        <div>
            {loading ? (
                <Spin />
            ) : (
                <Table 
                    dataSource={gradeData} 
                    columns={columns} 
                    rowKey={record => record.attemptId}
                />
            )}
        </div>
    );
};

export default GradeBookPage;

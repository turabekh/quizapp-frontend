import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Card, List, Modal } from 'antd';

const CourseDetailPageTitle = ({ course }) => {
    return (
        <div className='course-detail-page-title'>
            <div>{course.teacher.first_name} {course.teacher.last_name}</div>
            <div>{course.name}</div>
            <div className='title-hidden'>{course.description}</div>
            <div className='title-hidden'>{course.academic_year}</div>
        </div>
    );
};

const TopicTitle = ({ topic }) => {
    return (
        <div style={{display: "flex", justifyContent: "start", gap: "0px", alignItems: "center"}}>
            <div style={{minWidth: "400px"}}>{topic.title}</div>
            <div className='title-hidden'>{topic.description}</div>
        </div>
    );
}

const TopicList = ({ topics }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const showQuizzesModal = (topic) => {
        setSelectedTopic(topic);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedTopic(null);
    };

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={topics}
                renderItem={topic => (
                    <List.Item>
                        <List.Item.Meta
                            title={<TopicTitle topic={topic} />}
                            description={
                                <div style={{color: "blue", cursor: "pointer"}} onClick={() => showQuizzesModal(topic)}>
                                    Quizzes: {topic.quizzes.length}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
            <Modal
                title={`Quizzes in '${selectedTopic?.title}'`}
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <List
                    dataSource={selectedTopic?.quizzes}
                    renderItem={quiz => <List.Item>
                        <Link to={`/quizes/${quiz.id}`}>{quiz.title}</Link>
                    </List.Item>}
                />
            </Modal>
        </>
    );
};

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://turaboyformisc.pythonanywhere.com/api/courses/courses/${courseId}/`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
            setLoading(false);
        };

        fetchCourse();
    }, [courseId]);

    if (loading) return <Spin />;

    return (
        <div>
            {course ? (
                <Card title={<CourseDetailPageTitle course={course} />}>
                    <TopicList topics={course.topics} />
                </Card>
            ) : (
                <p>Course not found.</p>
            )}
        </div>
    );
};

export default CourseDetailPage;

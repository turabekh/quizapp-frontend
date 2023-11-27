import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Card, Modal } from 'antd';
import CourseDetailPageTitle from '../courses/components/CourseDetailPageTitle';
import TopicList from '../courses/components/TopicList';


const CourseDetailPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');

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


    const showDescriptionModal = (description) => {
        setSelectedDescription(description);
        setIsDescriptionModalVisible(true);
    };

    if (loading) return <Spin />;

    return (
        <div>
            {course ? (
                <Card title={<CourseDetailPageTitle course={course} showDescriptionModal={showDescriptionModal} />}>
                    <TopicList topics={course.topics} />
                </Card>
            ) : (
                <p>Course not found.</p>
            )}

            <Modal
                title="Course Description"
                open={isDescriptionModalVisible}
                onCancel={() => setIsDescriptionModalVisible(false)}
                footer={null}
            >
                <p>{selectedDescription}</p>
            </Modal>
        </div>
    );
};

export default CourseDetailPage;

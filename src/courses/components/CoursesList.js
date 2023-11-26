import React, { useState, useContext, useMemo } from 'react';
import {Link} from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { AuthContext } from "../../context/AuthContext";
import { Table, message, Spin, Modal, Button, Select } from 'antd';
import { fetchCoursesWithEnrollment, enrollInCourse, unenrollFromCourse } from "../courseService";

const { Option } = Select;

const CoursesList = () => {
    const queryClient = useQueryClient();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(undefined);
    const { get_user_token } = useContext(AuthContext);
    const { data: courses, isLoading, isError } = useQuery('courses', () => fetchCoursesWithEnrollment(get_user_token()));
    const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');

    const showEnrollModal = (course) => {
        setSelectedCourse(course);
        setIsModalVisible(true);
    };

    const showDescriptionModal = (description) => {
        setSelectedDescription(description);
        setIsDescriptionModalVisible(true);
    };

    const handleEnroll = async () => {
        try {
            await enrollInCourse(selectedCourse.id, get_user_token());
            message.success(`Successfully enrolled in ${selectedCourse.name}`);
            setIsModalVisible(false);
            queryClient.invalidateQueries('courses');
        } catch (error) {
            message.error(`Error enrolling in ${selectedCourse.name}`);
        }
    };

    const handleUnenroll = async (courseId) => {
        try {
            await unenrollFromCourse(courseId, get_user_token());
            message.success(`Successfully unenrolled`);
            queryClient.invalidateQueries('courses');
        } catch (error) {
            message.error(`Error unenrolling: ${error.response.data.message || error.message}`);
        }
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const filteredCourses = useMemo(() => {
        return selectedTeacher ? courses.filter(course => course.teacher?.id === selectedTeacher) : courses;
    }, [courses, selectedTeacher]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <Link to={`/courses/${record.id}`}>{record.name}</Link>
        },
        {
            title: 'Teacher',
            dataIndex: ['teacher', 'first_name'],
            key: 'teacher',
            render: (_, record) => `${record.teacher.first_name} ${record.teacher.last_name}`
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: text => (
                <div
                    onClick={() => showDescriptionModal(text)}
                    className="truncate-text"
                >
                    {text}
                </div>
            ),
        },
        {
            title: 'Academic Year',
            dataIndex: 'academic_year',
            key: 'academic_year',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                record.is_enrolled ? 
                <Button onClick={() => handleUnenroll(record.id)}>Unenroll</Button> :
                <Button type="primary" onClick={() => showEnrollModal(record)}>Enroll</Button>
            ),
        },
    ];

    const teacherOptions = useMemo(() => {
        const uniqueTeachers = [];
        courses?.forEach(course => {
            if (course.teacher && !uniqueTeachers.some(t => t.id === course.teacher.id)) {
                uniqueTeachers.push(course.teacher);
            }
        });
        return uniqueTeachers.map(teacher => (
            <Option key={teacher.id} value={teacher.id}>
                {teacher.first_name} {teacher.last_name}
            </Option>
        ));
    }, [courses]);



    if (isLoading) {
        return <Spin />;
    }

    if (isError) {
        message.error('Error fetching courses');
        return <p>Error loading courses.</p>;
    }



    return (
        <>
            <Select
                style={{ width: 200, marginBottom: 16 }}
                placeholder="Filter by Teacher"
                onChange={setSelectedTeacher}
                allowClear
            >
                {teacherOptions}
            </Select>
            <Table 
                dataSource={filteredCourses} 
                columns={columns} 
                rowKey={record => record.id} 
                scroll={{ x: 'max-content' }}
            />
            <Modal
                title={`Enroll in Course: ${selectedCourse?.name}`}
                open={isModalVisible}
                onOk={handleEnroll}
                onCancel={handleCancel}
                okText="Enroll"
                cancelText="Cancel"
            >
                <p>Are you sure you want to enroll in {selectedCourse?.name}?</p>
            </Modal>

            <Modal
                title="Course Description"
                open={isDescriptionModalVisible}
                onCancel={() => setIsDescriptionModalVisible(false)}
                footer={null}
            >
                <p>{selectedDescription}</p>
            </Modal>
        </>
    );
};

export default CoursesList;

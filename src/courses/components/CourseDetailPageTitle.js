import React, { useState } from 'react';
import { Modal } from 'antd';


const CourseDetailPageTitle = ({ course, showDescriptionModal }) => {

    const [isLearningOutcomesModalVisible, setIsLearningOutcomesModalVisible] = useState(false);
    const [isAssessmentCriteriaModalVisible, setIsAssessmentCriteriaModalVisible] = useState(false);

    const showLearningOutcomes = () => {
        setIsLearningOutcomesModalVisible(true);
    };

    const showAssessmentCriteria = () => {
        setIsAssessmentCriteriaModalVisible(true);
    };
    return (
        <>
            <div className='course-detail-page-title'>
                <div>{course.teacher.first_name} {course.teacher.last_name}</div>
                <div>{course.name}</div>
                <div className='title-hidden truncate-text preserve-whitespace' onClick={() => showDescriptionModal(course.description)}>{course.description}</div>
                <div className='title-hidden truncate-text' onClick={() => showLearningOutcomes()} >{course?.learning_outcomes}</div>
                <div className='title-hidden truncate-text' onClick={() => showAssessmentCriteria()}>Assessment Criteria</div>
                <div className='title-hidden'>{course.academic_year}</div>
            </div>
            <Modal
                title="Learning Outcomes"
                open={isLearningOutcomesModalVisible}
                onCancel={() => setIsLearningOutcomesModalVisible(false)}
                footer={null}
            >
                <p className='preserve-whitespace'>{course?.learning_outcomes}</p>
            </Modal>

            <Modal
                title="Assessment Criteria"
                open={isAssessmentCriteriaModalVisible}
                onCancel={() => setIsAssessmentCriteriaModalVisible(false)}
                footer={null}
            >
                <div>
                    {course?.assessment_criteria?.map(assessment => (
                        <div>
                            <h3 style={{ textAlign: "center" }}>{assessment?.criteria_type?.toUpperCase()}</h3>
                            <p className='preserve-whitespace'>{assessment.criteria}</p>
                        </div>
                    ))}
                </div>

            </Modal>
        </>
    );
};

export default CourseDetailPageTitle;
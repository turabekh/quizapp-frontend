import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Modal } from 'antd';
import TopicTitle from './TopicTitle';


const TopicList = ({ topics }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isTopicDescriptionModalVisible, setIsTopicDescriptionModalVisible] = useState(false);
    const [selectedTopicDescription, setSelectedTopicDescription] = useState('');

    const showQuizzesModal = (topic) => {
        setSelectedTopic(topic);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedTopic(null);
    };

    const showTopicDescriptionModal = (description) => {
        setSelectedTopicDescription(description);
        setIsTopicDescriptionModalVisible(true);
    };

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={topics}
                renderItem={topic => (
                    <List.Item>
                        <List.Item.Meta
                            title={<TopicTitle topic={topic} showTopicDescriptionModal={showTopicDescriptionModal} />}
                            description={
                                <div style={{ color: "blue", cursor: "pointer" }} onClick={() => showQuizzesModal(topic)}>
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
            <Modal
                title="Topic Description"
                open={isTopicDescriptionModalVisible}
                onCancel={() => setIsTopicDescriptionModalVisible(false)}
                footer={null}
            >
                <p>{selectedTopicDescription}</p>
            </Modal>
        </>
    );
};


export default TopicList;
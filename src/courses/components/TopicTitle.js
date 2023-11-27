import React from 'react';


const TopicTitle = ({ topic, showTopicDescriptionModal}) => {
    return (
        <div style={{ display: "flex", justifyContent: "start", gap: "0px", alignItems: "center" }}>
            <div style={{ minWidth: "400px" }}>{topic.title}</div>
            <div className='title-hidden truncate-text' onClick={() => showTopicDescriptionModal(topic.description)}>{topic.description}</div>
        </div>
    );
}

export default TopicTitle;
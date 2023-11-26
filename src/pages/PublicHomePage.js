import React from 'react';
import { Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const PublicHomePage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Title>Welcome to Our Application!</Title>
            <Paragraph>
                Join us today to explore all the features.
            </Paragraph>
            <Space size="middle">
                <Link to="/login">
                    <Button type="primary">Sign In</Button>
                </Link>
                <Link to="/register">
                    <Button type="secondary">Register</Button>
                </Link>
            </Space>
        </div>
    );
};

export default PublicHomePage;

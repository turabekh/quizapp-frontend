import React from 'react';
import { Button, Typography, Space, Row, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import HomeImage1 from "../assets/homeimage1.webp";
import HomeImage2 from "../assets/homeimage2.webp";

const { Title, Paragraph } = Typography;

const PublicHomePage = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <Row align="middle" justify="center" gutter={[16, 16]}>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Title>Welcome to Quiz Master!</Title>
                    <Paragraph>
                        Your one-stop destination for enhancing knowledge and skills through interactive quizzes and diverse courses.
                    </Paragraph>
                </Col>
                <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                    <Image
                        width={400}
                        src={HomeImage1}
                        alt="Quiz Image"
                    />
                    <Image
                        width={400}
                        src={HomeImage2}
                        alt="Course Image"
                    />
                </Col>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Space size="middle">
                        <Link to="/login">
                            <Button type="primary">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Register</Button>
                        </Link>
                    </Space>
                </Col>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Paragraph>
                        Explore a wide range of courses, take quizzes, and track your learning progress!
                    </Paragraph>
                </Col>
            </Row>
        </div>
    );
};

export default PublicHomePage;

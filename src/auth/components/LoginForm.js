import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, message, Typography } from 'antd';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginForm = () => {
    const [form] = Form.useForm();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            await login(values.email, values.password);
            message.success('Login successful');
            // You can redirect or perform other actions upon successful login
            navigate('/');
        } catch (error) {
            message.error('Login failed: ' + (error.message || 'Unknown error'));
        }
    };

    return (
        <div>
                    <Title style={{ textAlign: "center", marginBottom: "20px" }} level={3}>
          Login
        </Title>
        <Form
            form={form}
            name="login"
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block >
                    Log in
                </Button>
            </Form.Item>
        </Form>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
          <Text>
            Not a member yet? <Link to="/register">Register</Link>
          </Text>
        </div>
        </div>
    );
};

export default LoginForm;

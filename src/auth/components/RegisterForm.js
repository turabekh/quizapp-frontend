import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, message, Typography } from 'antd';
import { useQuery } from 'react-query';
import { AuthContext } from "../../context/AuthContext";


const { Option } = Select;
const { Title, Text } = Typography;

const fetchStudentGroups = async () => {
    // Replace with actual API call to fetch student groups
    const response = await fetch('https://turaboyformisc.pythonanywhere.com/api/auth/student-groups/');
    if (!response.ok) {
        // return hard coded data if API call fails
        return [
            { id: 1, name: 'Group 1' },
            { id: 2, name: 'Group 2' },
            { id: 3, name: 'Group 3' },
        ];
    }
    return response.json();
};

const RegisterForm = () => {
    const [form] = Form.useForm();
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const { data: studentGroups, isLoading: isLoadingGroups } = useQuery('studentGroups', fetchStudentGroups);


    const onFinish = async (values) => {
        try {
            await register(values.email, values.firstName, values.lastName, values.password, values.studentGroupId);
            message.success('Registration successful');
            // You can redirect or perform other actions upon successful login
            navigate('/');
        } catch (error) {
            message.error('Registration failed: ' + (error.message || 'Unknown error'));
        }
    };

    if (isLoadingGroups) return <p>Loading...</p>;

    return (
        <div>
            <Title style={{ textAlign: 'center', marginBottom: '20px' }} level={3}>
                Register
            </Title>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your E-mail!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="studentGroupId"
                    label="Student Group"
                    rules={[{ required: true, message: 'Please select your student group!' }]}
                >
                    <Select placeholder="Select a student group" loading={isLoadingGroups}>
                        {studentGroups?.map(group => (
                            <Option key={group.id} value={group.id}>{group.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'center' }}>
                {/* Already have an account? Login Link */}
                <Text>
                    Already have an account? <Link to="/login">Login</Link>
                </Text>
            </div>
        </div>
    );
};

export default RegisterForm;

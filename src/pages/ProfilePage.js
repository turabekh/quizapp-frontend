import React, { useEffect, useContext } from 'react';
import { Form, Input, Button, message, Tabs } from 'antd';
import axios from 'axios';
import { useMutation } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import "./page.css"

const { TabPane } = Tabs;

const ProfilePage = () => {
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const { currentUser, get_user_token, setCurrentUser } = useContext(AuthContext);

    useEffect(() => {
        const userProfile = { ...currentUser };
        form.setFieldsValue(userProfile);
    }, [form, currentUser]);

    const profileMutation = useMutation(values => {
        return axios.put('https://turaboyformisc.pythonanywhere.com/api/auth/profile/update/', values, {
            headers: {
                Authorization: `Bearer ${get_user_token()}` // Assuming the token is stored in currentUser
            }
        });
    }, {
        onSuccess: (data) => {
            // Handle success
            message.success('Profile updated successfully');
            setCurrentUser({ ...currentUser, ...data.data }); // Update the current user's data
        },
        onError: (error) => {
            // Handle error
            message.error('Failed to update profile: ' + error.message);
        }
    });


    const passwordMutation = useMutation(values => {
        return axios.post('https://turaboyformisc.pythonanywhere.com/api/auth/password/change/', { old_password: values?.old_password, new_password: values?.new_password }, {
            headers: {
                Authorization: `Bearer ${get_user_token()}` // Assuming the token is stored in currentUser
            }
        });
    }, {
        onSuccess: (data) => {
            // Handle success
            message.success('Profile updated successfully');
            setCurrentUser({ ...currentUser, ...data.data }); // Update the current user's data
        },
        onError: (error) => {
            // Handle error
            message.error('Failed to update profile: ' + error.message);
        }
    });

    const handlePasswordSubmit = (values) => {
        passwordMutation.mutate(values);
    };

    const handleProfileSubmit = (values) => {
        profileMutation.mutate(values);
    };

    return (
        <div className='form-card form-width'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Update Profile" key="1">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleProfileSubmit}
                        initialValues={currentUser}
                    >
                        <Form.Item label="First Name" name="first_name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Last Name" name="last_name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Phone Number" name="phone_number">
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Update Profile
                        </Button>
                    </Form>
                </TabPane>
                <TabPane tab="Change Password" key="2">
                    <Form
                        form={passwordForm}
                        layout="vertical"
                        onFinish={handlePasswordSubmit}
                    >
                        <Form.Item label="Current Password" name="old_password">
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="New Password" name="new_password">
                            <Input.Password />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Change Password
                        </Button>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ProfilePage;

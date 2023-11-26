import React, { useEffect, useContext } from 'react';
import { Upload, Form, Input, Button, message, Tabs, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useMutation } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import DefaultAvatar from "../assets/defaultAvatar.avif"
import "./page.css"

const { TabPane } = Tabs;

const ProfilePage = () => {
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const { currentUser, get_user_token, setCurrentUser } = useContext(AuthContext);

    useEffect(() => {
        // Initialize form values here
        form.setFieldsValue({
            first_name: currentUser?.first_name,
            last_name: currentUser?.last_name,
            phone_number: currentUser?.phone_number,
            profile_image: currentUser?.profile_image 
        });
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
            console.log("DAAAAAAAATA", data.data)
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
        const formData = new FormData();
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('phone_number', values.phone_number);

        if (values.profile_image && values.profile_image.length > 0) {
            // Ensure we're working with the file object
            const file = values.profile_image[0].originFileObj;
            if (file) {
                formData.append('profile_image', file);
            }
        }

        profileMutation.mutate(formData);
    };


    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    let currentProfileImage = () => {
        if (currentUser?.profile_image) {
            if (currentUser?.profile_image?.startsWith("http")) {
                return currentUser?.profile_image
            } else {
                return `http://localhost:8000${currentUser?.profile_image}`
            }
        }
        else {
            return DefaultAvatar
        }
    }
    return (
        <div className='form-card form-width'>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Image
                    src={currentProfileImage()}
                    style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }}
                    alt="Profile Avatar"
                />
            </div>
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
                        <Form.Item
                            label="Profile Image"
                            name="profile_image"
                            // valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                name="profile_image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={true}
                                beforeUpload={() => false} // Return false so that antd doesn't upload the files automatically
                            >
                                {uploadButton}
                            </Upload>
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

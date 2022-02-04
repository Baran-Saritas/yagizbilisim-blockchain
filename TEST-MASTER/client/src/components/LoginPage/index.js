import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Formdan Gelen Veriler: ", values);
    dispacth(loginUser(values.username, values.password));
    navigate("/");
  };
  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;

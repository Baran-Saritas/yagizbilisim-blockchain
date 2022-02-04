import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { emailValidator } from "../../helpers/emailValidator";
import {
  passwordValidator,
  passwordControlValidator,
} from "../../helpers/passwordValidator";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../store/actions/userActions";

const SignupPage = () => {
  const dispacth = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    if (emailValidator(values.email)) {
      alert("Incorrect Email!");
      return;
    }
    if (passwordValidator(values.password)) {
      alert("Password must be at least 5 characters!");
      return;
    }
    if (passwordControlValidator(values.password, values.passwordControl)) {
      alert("Two passwords that you entered are not matching!");
      return;
    }
    console.log("Formdan Gelen Veriler: ", values);

    dispacth(registerUser(values.username, values.password));
    history.push("/login");
  };
  return (
    <Form
      name='normal_signup'
      className='signup-form'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='email'
        rules={[
          {
            required: true,
            message: "Please input your email address!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className='site-form-item-icon' />}
          placeholder='Email'
        />
      </Form.Item>
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
      <Form.Item
        name='passwordControl'
        rules={[
          {
            required: true,
            message: "Passwords must match!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Again Password'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='already-have-an-account'></Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='signup-form-button'>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupPage;

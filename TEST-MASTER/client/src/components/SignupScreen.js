import React from "react";
import "antd/dist/antd.css";
import "../styles/SignupScreen.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { emailValidator } from "../helpers/emailValidator";
import {
  passwordValidator,
  passwordControlValidator,
} from "../helpers/passwordValidator";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../store/actions/userActions";

const SignupScreen = () => {

  const dispacth = useDispatch();
  const history = useHistory();


  const onFinish = (values) => {
    if (emailValidator(values.email)) {
      alert("Incorrect Email!");
    }
    if (passwordValidator(values.password)) {
      alert("Password must be at least 5 characters!");
    }
    if (passwordControlValidator(values.password, values.passwordControl)) {
      alert("Two passwords that you entered are not matching!");
    }
    console.log("Formdan Gelen Veriler: ", values);

    dispacth(registerUser(values.username,values.password))
  history.push("/login")

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
        <Form.Item name='already-have-an-account'>
          <a href='#' className='login-navigation'>
            Already have an account?
          </a>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='signup-form-button'>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignupScreen;

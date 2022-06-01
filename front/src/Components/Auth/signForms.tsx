import s from './login.module.css';
import React, { FC } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { Button, Checkbox, Form, Input } from 'antd';
import { FiLock } from 'react-icons/fi';
import { LoginProps, RegisterProps } from '../../../types/types';

export const SignInForm: FC<LoginProps> = ({ onSubmit, setSignUp }) => {
  return (
    <Form
      name="login"
      className={s.form}
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmit}
    >
      <Form.Item
        name="login"
        rules={[
          { required: true, message: 'Please input your Username!' },
          { min: 5, message: 'Min length is 5 symbols' },
          { max: 20, message: 'Max length is 20 symbols' },
        ]}
      >
        <Input prefix={<FaRegUser />} placeholder="Login" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your Password!' },
          { min: 8, message: 'Min length is 8 symbols' },
          { max: 40, message: 'Max length is 40 symbols' },
        ]}
      >
        <Input.Password prefix={<FiLock />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={s.formButton}>
          Log in
        </Button>
        Or{' '}
        <span className={s.formNavigate} onClick={setSignUp}>
          register now!
        </span>
      </Form.Item>
    </Form>
  );
};
export const SignUpForm: FC<RegisterProps> = ({ onSubmit, setSignUp }) => {
  return (
    <Form
      name="login"
      className={s.form}
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmit}
    >
      <Form.Item name="username">
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="login"
        rules={[
          { required: true, message: 'Please input your Login!' },
          { min: 5, message: 'Min length is 5 symbols' },
          { max: 20, message: 'Max length is 20 symbols' },
        ]}
      >
        <Input placeholder="Login" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your Password!' },
          { min: 8, message: 'Min length is 8 symbols' },
          { max: 40, message: 'Max length is 40 symbols' },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={s.formButton}>
          Sign Up
        </Button>
        Already registered?{' '}
        <span className={s.formNavigate} onClick={setSignUp}>
          Login
        </span>
      </Form.Item>
    </Form>
  );
};

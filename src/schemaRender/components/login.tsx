import React, { useRef } from 'react';
import { LoginForm as ProLoginForm, ProFormText } from '@ant-design/pro-form';
import styled from 'styled-components';
import { message } from 'antd';
import { ICommonProps } from '..';
import { runInAction } from 'mobx';

interface IProps extends ICommonProps {
  title: string;
}

const LoginWrap = styled.div`
  background: #fff;
  padding: 30px;
`;

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const LoginForm = (props: IProps) => {
  const { title = '手机号登录', store, id, ...rest } = props;
  const formRef = useRef();

  return (
    <LoginWrap {...rest}>
      <div>{JSON.stringify(store.pageData[id])}</div>
      <ProLoginForm
        title={title}
        onFinish={async (values: any) => {
          console.log(values);

          store.updateData(id, values);

          message.success('提交成功');
        }}
      >
        <ProFormText
          name="username"
          placeholder={'用户名: admin or user'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          placeholder={'密码: ant.design'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </ProLoginForm>
    </LoginWrap>
  );
};

const loginComponentMap = {
  LoginForm,
};
export default loginComponentMap;

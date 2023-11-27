import React from 'react';
import styled from "styled-components";
import LoginForm from '../components/LoginForm';

const LoginTitle = styled.h1`
  text-align: center;
`;

const LoginPage: React.FC = () => {
  return (
    <div>
      <LoginTitle>Login Page</LoginTitle>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

// src/pages/SignupPage.tsx
import React from 'react';
import styled from "styled-components";
import SignupForm from '../components/SignupForm';

const SignupTitle = styled.h1`
  text-align: center;
`;

const SignupPage: React.FC = () => {
  return (
    <div>
      <SignupTitle>Signup Page</SignupTitle>
      <SignupForm />
    </div>
  );
};

export default SignupPage;

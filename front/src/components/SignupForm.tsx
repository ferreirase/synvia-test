// src/components/SignupForm.tsx
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { api } from '../services/api';

const SignupFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  padding: 20px;
`;

const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setLoading(true);

    const { data } = await api.post('/signup', signupData);

    console.log(data);

    setSignupData({
      name: '',
      email: '',
      password: ''
    });

    setLoading(false);
  };

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSignupData({
      email: signupData.email,
      password: signupData.password,
      name: event.target.value
    });    
  };

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSignupData({
      email: event.target.value,
      password: signupData.password,
      name: signupData.name
    });    
  };

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSignupData({
      email: signupData.email,
      name: signupData.name,
      password: event.target.value
    });    
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <SignupFormContainer>
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        value={signupData.name}
        onChange={e => handleNameInputChange(e)}
      />
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        value={signupData.email}
        onChange={e => handleEmailInputChange(e)}
      />
      <TextField
        label="Password"
        value={signupData.password}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="normal"
        onChange={e => handlePasswordInputChange(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      /> <br />
      <Button disabled={loading} onClick={e => handleLogin(e)} variant="contained" color="primary" fullWidth>
        {loading ? <CircularProgress color="inherit" /> : "SIGN UP"}
      </Button> <br />
      <p>Já tem cadastro? <a href="/login">Clique aqui!</a></p>
    </SignupFormContainer>
  );
};

export default SignupForm;

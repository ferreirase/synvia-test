import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { Navigate } from "react-router-dom";
import styled from 'styled-components';
import { useAuth } from "../contexts/AuthContext";

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  padding: 20px;
`;

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);

  const { signIn, signed } = useAuth();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); 

    setLoading(true);

    await signIn(loginData.email, loginData.password);

    setLoading(false);

    setLoginData({
      email: '',
      password: ''
    });
  };

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoginData({
      email: event.target.value,
      password: loginData.password
    });    
  };

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoginData({
      email: loginData.email,
      password: event.target.value
    });    
  };
  
  return signed ? <Navigate to='/' />: (
    <LoginFormContainer>
      <TextField label="Email" variant="outlined" margin="normal" onChange={e => handleEmailInputChange(e)}/>
      <TextField
        onChange={e => handlePasswordInputChange(e)}
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="normal"
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
      <Button variant="contained" color="primary" fullWidth onClick={e => handleLogin(e)}>
      {loading ? <CircularProgress color="inherit" /> : "LOGIN"}
      </Button>
      <br />
      <p>Ainda não tem cadastro? <a href="/signup">Clique aqui!</a></p>
    </LoginFormContainer>
  );
};

export default LoginForm;

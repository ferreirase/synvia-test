import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { GlobalStyles } from './styles/GlobalStyles';

export const PrivateRoute = () => {
  const { signed, loading, setTokenApiHeader} = useAuth();
  const [isSigned, setIsSigned] = useState(signed); 

  useEffect(() => {
    setTokenApiHeader();
  }, [signed]);

  useEffect(() => {
    if (!loading) {
      setIsSigned(signed);
    }
  }, [signed, loading]);

  return isSigned ? <Outlet /> : <Navigate to='/login' />;
}; 

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

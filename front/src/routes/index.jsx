import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={LoginPage} />
        <Route path='/signup' element={SignupPage} />
      </Routes>
    </Router>
  );
};

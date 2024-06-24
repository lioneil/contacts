import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RedirectToDashboardIfAuthenticated ({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check.php');
        if (!response.data?.isAuthenticated) {
          navigate('/');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  return children;
};

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { loginSuccess, loginFailure } from '../redux/slices/aythSlice';

interface LoginCredentials {
  username: string;
  password: string;
  remember?: boolean;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/user/login', {
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 30,
      });

      dispatch(loginSuccess({ user: response.data, token: response.data.accessToken }));

      if (credentials.remember) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(loginFailure(error.response?.data?.message || 'Authorization error'));
      } else if (error instanceof Error) {
        dispatch(loginFailure(error.message));
      } else {
        dispatch(loginFailure('Authorization error'));
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

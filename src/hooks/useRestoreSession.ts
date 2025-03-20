import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../redux/slices/aythSlice';

const useRestoreSession = (): boolean => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(
        loginSuccess({
          user: parsedUser,
          token: parsedUser.accessToken,
        })
      );
    } else {
      dispatch(logout());
    }
    setIsInitialized(true);
  }, [dispatch]);

  return isInitialized;
};

export default useRestoreSession;

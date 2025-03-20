import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

export const useFetchUsers = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersStart());
      try {
        const response = await axiosInstance.get('/users');
        dispatch(fetchUsersSuccess(response.data.users));
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          dispatch(fetchUsersFailure(err.response?.data?.message || 'Error fetching users'));
        } else if (err instanceof Error) {
          dispatch(fetchUsersFailure(err.message));
        } else {
          dispatch(fetchUsersFailure('Error fetching users'));
        }
      }
    };

    fetchUsers();
  }, [dispatch]);

  return { users: list, loading, error };
};

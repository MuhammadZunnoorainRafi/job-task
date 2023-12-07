import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ITask } from '../utils/types';
import { useAppSelector } from './RTKhooks';

export const useGetTaskQuery = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axios.get('/api/task/get');
    },
  });
};

export const useCreateTaskQuery = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ITask) => {
      await axios.post('/api/task/post', data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

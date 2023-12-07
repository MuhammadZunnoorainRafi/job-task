import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ITask, ITaskEdit } from '../utils/types';
import { useAppSelector } from './RTKhooks';

export const useGetTaskQuery = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axios.get('/api/task/get', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return res.data;
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

export const useDeleteTaskQuery = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        data: {
          id: id,
        },
      };
      await axios.delete('/api/task/delete', config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTaskQuery = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ITaskEdit) => {
      await axios.put('/api/task/put', data, {
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

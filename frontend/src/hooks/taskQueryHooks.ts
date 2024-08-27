import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ITask, ITaskEdit, TaskStats } from '../utils/types';
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
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousData = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (oldTasks: TaskStats[]) => {
        return [...oldTasks, newTask];
      });
      return { previousData };
    },
    onError: (err, newTask, context) => {
      console.log(err);
      queryClient.setQueryData(['tasks'], context?.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
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
    onMutate: async (deletedTask: unknown) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousData = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData(['tasks'], (oldTasks: TaskStats[]) =>
        oldTasks.filter((task) => task._id !== (deletedTask as TaskStats)._id)
      );
      return { previousData };
    },
    onError: (err, newTask, context) => {
      console.log(err);
      queryClient.setQueryData(['tasks'], context?.previousData);
    },
    onSettled: () => {
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
    onMutate: async (editedTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousData = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (oldData: TaskStats[]) =>
        oldData.map((task) => (task._id === editedTask.id ? editedTask : task))
      );
      return { previousData };
    },
    onError: (err, editedTask, context) => {
      console.log(err);
      queryClient.setQueryData(['tasks'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { ITask, ITaskEdit, TaskStats } from '../utils/types';
import { useAppSelector } from './RTKhooks';

export const useGetTaskQuery = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  return useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(`/api/task/get?page=${pageParam}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      console.log(lastPageParam);
      if (lastPage.length < 5) {
        return;
      }
      return lastPageParam + 1;
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
      queryClient.setQueryData(
        ['tasks'],
        (oldTasks: InfiniteData<TaskStats[]>) => {
          const firstPage = oldTasks.pages[0];
          if (firstPage) {
            return {
              pageParams: oldTasks.pageParams,
              pages: [[newTask, ...firstPage], ...oldTasks.pages.slice(1)],
            };
          }
        }
      );
      return { previousData };
    },
    onError: (err, __, context) => {
      console.log({ err });
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
    onMutate: async (deletedTaskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousData = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData(
        ['tasks'],
        (oldTasks: InfiniteData<TaskStats[]>) => {
          return {
            pageParams: oldTasks.pageParams,
            pages: oldTasks.pages.map((page) =>
              page.filter((task) => task._id !== deletedTaskId)
            ),
          };
        }
      );
      return { previousData };
    },
    onError: (_, __, context) => {
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
      queryClient.setQueryData(
        ['tasks'],
        (oldData: InfiniteData<TaskStats[]>) => {
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) =>
              page.map((task) =>
                task._id === editedTask.id ? editedTask : task
              )
            ),
          };
        }
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['tasks'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

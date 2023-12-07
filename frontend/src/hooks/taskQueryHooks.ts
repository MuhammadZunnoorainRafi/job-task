import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ITask } from '../utils/types';

export const useCreateTaskQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ITask) => {
      await axios.post('/api/task/post', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

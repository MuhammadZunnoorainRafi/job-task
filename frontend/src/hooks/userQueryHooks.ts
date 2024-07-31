import { useMutation } from '@tanstack/react-query';
import { ISignInData, ISignUpData } from '../utils/types';
import axios from 'axios';

export const useSignUpQueryHook = () => {
  return useMutation({
    mutationFn: async (data: ISignUpData) => {
      const res = await axios.post('/api/auth/signUp', data);
      return res.data;
    },
  });
};

export const useSignInQueryHook = () => {
  return useMutation({
    mutationFn: async (data: ISignInData) => {
      const res = await axios.post('/api/auth/signIn', data);
      return res.data;
    },
  });
};

'use client';

import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AUTH_API } from '../services';
import { ILogin, IRegister } from '@aafiyah/types';
import { useLocalStorage } from 'usehooks-ts';
import { LOGGED_IN } from '../constant';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const { push } = useRouter();
  const [, setLoggedIn] = useLocalStorage(LOGGED_IN, false);
  const queryClient = useQueryClient();

  const { handleSubmit, ...form } = useForm<ILogin & IRegister>({
    mode: 'all',
  });

  const login = handleSubmit(async (data: ILogin) => {
    try {
      toast.promise(AUTH_API.login(data), {
        loading: 'Logging in...',
        success: (data) => {
          setLoggedIn(true);
          push('/dashboard');
          return 'Logged in!';
        },
        error: (err) => {
          return err.message;
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  const signUp = handleSubmit(async (data: IRegister) => {
    try {
      toast.promise(AUTH_API.register(data), {
        loading: 'Registering...',
        success: (data) => {
          setLoggedIn(true);
          push('/dashboard');
          return 'Registered!';
        },
        error: (err) => {
          console.log(err);
          return err.message;
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  const logout = async () => {
    try {
      toast.promise(AUTH_API.logout(), {
        loading: 'Logging out...',
        success: () => {
          setLoggedIn(false);
          push('/');
          queryClient.removeQueries({ queryKey: ['me'], exact: true });
          return 'Logged out!';
        },
        error: (err) => {
          console.log(err);
          return err.message;
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { login, signUp, logout, ...form };
};

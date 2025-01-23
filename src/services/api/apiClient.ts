import { Res } from '@/types';
import { Register } from '@tanstack/react-query';
import axios, { AxiosInstance, isAxiosError } from 'axios';
import type { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';

/**
 * @name ApiClient
 * @description Axios instance with interceptors
 * @returns AxiosInstance
 */
function ApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Accept: 'application/json'
    }
  });

  const isServer = typeof window === 'undefined';

  // --- REQUEST INTERCEPTOR ---
  instance.interceptors.request.use(
    async request => {
      let session: Session | null = null;

      // Only try to fetch the session if we're on the client
      if (!isServer) {
        session = await getSession();
      }

      if (session && session.user.token) {
        request.headers.Authentication = `Bearer ${session.user.token}`;
      }

      return request;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // --- RESPONSE INTERCEPTOR ---
  instance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      if (isAxiosError(error)) {
        const invalidTokenMessages = ['Invalid token.', 'Ungültiger Token.'];
        const isInvalidToken = invalidTokenMessages.includes(error?.response?.data?.message);

        if (isInvalidToken) {
          await signOut(); // Sign out client if token is invalid
        } else if (error.response && error.response.data) {
          error.message = error.response.data.message;
        } else if (error.request) {
          error.message = 'No response received from server';
        } else {
          error.message = 'Error setting up request';
        }
        return Promise.reject(error);
      } else {
        console.error('Error:', error);
        return Promise.reject(error);
      }
    }
  );

  return instance;
}

export const register = async (data: Omit<Register, 'confirmPassword'>) => {
  const response = await ApiClient().post<Res<{ token: string }>>('/streamer/register', data);
  return response.data.data.token;
};

export default ApiClient();

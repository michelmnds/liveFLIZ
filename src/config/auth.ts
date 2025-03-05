import { loginSchema } from '@/schemas/auth.schema';
import { loginTokenSchema } from '@/schemas/login.schema';
import { StreamerType } from '@/schemas/streamer.schema';
import apiClient from '@/services/api/apiClient';
import { Res } from '@/types';
import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { safeParse } from 'valibot';

type LoginResponse = {
  data: {
    token: string;
    entityType: 'streamer';
  };
};

const MAX_AGE = 60 * 60 * 100; // 100 hours

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE // How long until an idle session expires and is no longer valid
  },
  jwt: {
    maxAge: MAX_AGE // How long until a JWT token expires
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        try {
          const result = safeParse(loginSchema, credentials);

          if (!result.success) {
            return null;
          }

          // 1. Call your backend with the user's email & password
          const response = await apiClient.post<LoginResponse>('/auth/login', result.output);

          // 2. If successful, return an object (this becomes `user`)
          if (response.data) {
            if (response.data.data.entityType !== 'streamer') {
              throw new AxiosError('Unprocessable Entity', '422', undefined, undefined, {
                status: 422
              } as AxiosResponse);
            }

            return { id: response.data.data.token }; // Return the token to the client
          }

          // 3. If it fails or returns no data, return null
          return null;
        } catch (error) {
          let statusCode;

          if (isAxiosError(error)) {
            statusCode = error?.response?.status.toString();
          }

          throw new Error(statusCode || '');
        }
      }
    }),
    CredentialsProvider({
      id: 'credentialsToken',
      name: 'CredentialsToken',
      credentials: { token: {} },
      async authorize(credentials) {
        try {
          // Track issue here: https://github.com/nextauthjs/next-auth/pull/9871
          const result = safeParse(loginTokenSchema, credentials);

          if (!result.success) {
            return null;
          }

          const response = await apiClient.get<Res<StreamerType>>('/streamer', {
            headers: {
              Authentication: `Bearer ${result.output.token}`
            }
          });

          if (response.data) {
            return {
              id: result.output.token,
              user: response.data.data
            }; // Save the user data to the client
          }
          return null;
        } catch (error) {
          let statusCode;

          if (isAxiosError(error)) {
            statusCode = error?.response?.status.toString();
          }

          throw new Error(statusCode || '');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // User object will be passed on initial signIn call where token will receive new fields
      if (user) {
        token.token = user.id || '';
        token.user = user.user;

        if (!user.user) {
          try {
            const response = await apiClient.get<Res<StreamerType>>('/streamer', {
              headers: {
                Authentication: `Bearer ${user.id}`
              }
            });

            if (response.data) {
              token.user = response.data.data;
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
      // Update token with new value for updating token or user data
      if (trigger === 'update' && session) {
        token.token = session.token ? (session.token as string) : token.token;
        token.user = {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...token.user,
          ...(session?.user && session.user)
        };
      }
      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.token = token.token;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.user = token.user;
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
};

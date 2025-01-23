import apiClient from '@/services/api/apiClient';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type LoginResponse = {
  data: {
    token: string;
    entityType: 'business' | 'person';
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // 1. Call your backend with the user's email & password
        const response = await apiClient.post<LoginResponse>('/auth/login', {
          email: credentials?.email,
          password: credentials?.password
        });

        // 2. If successful, return an object (this becomes `user`)
        if (response.data) {
          return {
            id: response.data.data.token, // store token in `id`
            entityType: response.data.data.entityType
          };
        }

        // 3. If it fails or returns no data, return null
        return null;
      }
    })
  ],

  // Use JWT-based sessions
  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.id;
        token.entityType = user.entityType;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        token: token.token,
        entityType: token.entityType
      };
      return session;
    }
  },

  // Needed to sign/encrypt the JWT in production
  secret: process.env.NEXTAUTH_SECRET
};

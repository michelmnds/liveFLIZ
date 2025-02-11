import 'next-auth';

declare module 'next-auth' {
  interface Session {
    token?: string;
  }
  interface Session {
    user?: {
      token?: string;
      entityType?: string;
    } & DefaultSession['user'];
  }
  interface User extends DefaultUser {
    entityType?: 'streamer';
  }
}

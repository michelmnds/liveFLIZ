import { StreamerType } from '@/schemas/streamer.schema';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    user?: StreamerType;
  }
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    token: string;
    user?: StreamerType;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    token: string;
    user?: StreamerType;
  }
}

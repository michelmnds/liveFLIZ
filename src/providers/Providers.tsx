import { Session } from 'next-auth';

import { ReactQueryProvider } from '@/app/ReactQueryProvider';
import { Theme } from '@radix-ui/themes';
import { SessionProvider } from './SessionProvider';

export function Providers({ session, children }: { session: Session | null; children: React.ReactNode }) {
  return (
    <SessionProvider session={session}>
      <Theme>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </Theme>
    </SessionProvider>
  );
}

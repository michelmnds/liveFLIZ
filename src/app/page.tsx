'use client';

/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { Typography } from '@/components/Typography';
import Link from 'next/link';
import { isDesktop } from 'react-device-detect';
import { FaCog, FaQrcode, FaWallet } from 'react-icons/fa';
import { FAQSection } from './_partials/FAQ';
import { Header } from './_partials/Header';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-5xl md:gap-[100px]">
      <Header />
      <div className="flex w-full flex-col items-center justify-start gap-5xl px-xl text-secondaryColor md:gap-[100px]">
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-2xl lg:flex-row">
          <div className="flex flex-col items-center justify-center gap-4 px-xl md:items-start md:gap-8 lg:max-w-[50%]">
            <Typography type="h1">Discover the future of content monetization.</Typography>
            <Typography type="h4" className="text-grey80">
              Use FLIZpay to monetize your content. We take 0% from your donations!
            </Typography>
            <Button className="max-w-[370px]">
              <Link href="/register" className="text-base">
                Create streamer account
              </Link>
            </Button>
          </div>
          <div className="w-[50%]">
            <img src="/landing-page.png" alt="Placeholder" className="hidden w-full max-w-[800px] lg:block" />
          </div>
        </div>
        <div className="mx-auto flex w-full flex-col items-center justify-start gap-2xl">
          <div className="flex flex-col items-center justify-center gap-6 px-xl lg:gap-20">
            <Typography type="h2" className="font-bold">
              How it works:
            </Typography>
            <div className="grid w-full max-w-5xl grid-cols-1 items-start justify-start gap-8 px-xl text-center lg:grid-cols-3 lg:gap-20">
              {/* Card 1 */}
              <div className="flex flex-col items-center gap-2">
                <FaCog size={isDesktop ? 80 : 40} className="w-20" />
                <Typography type="h4" className="font-bold">
                  Configuration
                </Typography>
                <Typography type="span">Set up the Browser Source widgets in your streaming software.</Typography>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col items-center gap-2">
                <FaQrcode size={isDesktop ? 80 : 40} />
                <Typography type="h4" className="font-bold">
                  Payment/Alert
                </Typography>
                <Typography type="span">
                  Your viewers send payments with messages using your QR-Code and they are displayed in your stream.
                </Typography>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col items-center gap-2">
                <FaWallet size={isDesktop ? 80 : 40} />
                <Typography type="h4" className="font-bold">
                  Money
                </Typography>
                <Typography type="span">
                  The money is available immediately in your bank account. All thanks to FLIZpay&apos;s instant
                  payments.
                </Typography>
              </div>
            </div>
            <FAQSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

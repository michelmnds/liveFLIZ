'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiSepa } from 'react-icons/si';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const handleHelpClick = () => {
    if (locale === 'de')
      return router.push('mailto:info@flizpay.de?subject=Hilfe&body=Bitte beschreibe dein Anliegen:');

    return router.push('mailto:info@flizpay.de?subject=Help Request&body=Please describe your issue or question:');
  };

  return (
    <footer className="bg-muted/30 w-full border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Links */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">{t('Labels.footer.company.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/careers">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    {t('Labels.footer.company.careers')}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">{t('Labels.footer.products.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shoppers">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    {t('Labels.footer.products.customers')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    {t('Labels.footer.products.companies')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/developers">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    {t('Labels.footer.products.developers')}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">{t('Labels.footer.support.title')}</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground hover:text-primary cursor-pointer" onClick={handleHelpClick}>
                  {t('Labels.footer.support.help')}
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">{t('Labels.footer.legal.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/imprint">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    {t('Labels.footer.legal.imprint')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    {t('Labels.footer.legal.privacy')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    {t('Labels.footer.legal.terms')}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-muted-foreground text-sm">
              {t('Labels.footer.copyright', { year: new Date().getFullYear() })}
            </div>
            <div className="text-muted-foreground flex items-center space-x-2 text-sm">
              <SiSepa className="h-6 w-6" />
              <span>{t('Labels.footer.sepaNote')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

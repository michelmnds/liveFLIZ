import { useTranslations } from 'next-intl';

export type Translate = ReturnType<typeof useTranslations<string>>;

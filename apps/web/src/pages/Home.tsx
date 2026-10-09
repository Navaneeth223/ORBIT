import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary px-md py-lg">
      <h1 className="text-2xl font-semibold text-ink-primary">
        {t('nav.home')}
      </h1>
      <p className="mt-md text-ink-secondary">Home page placeholder</p>
    </div>
  );
}

import { useTranslation } from 'react-i18next';

export function Splash() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-md">
      <h1 className="font-display text-3xl font-bold text-ink-primary mb-sm">
        {t('app.name')}
      </h1>
      <p className="text-lg text-ink-secondary">{t('app.tagline')}</p>
    </div>
  );
}

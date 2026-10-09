import { useEffect, useState } from 'react';
import { HealthResponseSchema } from '@orbit/shared';
import type { z } from 'zod';

type HealthResponse = z.infer<typeof HealthResponseSchema>;

export function HealthCheck() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

    fetch(`${apiUrl}/health`)
      .then((res) => res.json())
      .then((data) => {
        const parsed = HealthResponseSchema.safeParse(data);
        if (parsed.success) {
          setHealth(parsed.data);
          setError(null);
        } else {
          setError('Invalid response format');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch health status');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary px-md py-lg">
      <h1 className="text-2xl font-semibold text-ink-primary mb-md">
        Health Check
      </h1>

      {loading && <p className="text-ink-secondary">Loading...</p>}

      {error && (
        <div className="rounded-md bg-error/10 p-md border border-error/20">
          <p className="text-error font-medium">Error</p>
          <p className="text-ink-secondary text-sm mt-xs">{error}</p>
        </div>
      )}

      {health && (
        <div className="rounded-md bg-success/10 p-md border border-success/20">
          <p className="text-success font-medium">✓ API is healthy</p>
          <dl className="mt-sm space-y-xs">
            <div>
              <dt className="text-xs text-ink-tertiary">Status</dt>
              <dd className="text-ink-primary">{health.status}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-tertiary">Version</dt>
              <dd className="text-ink-primary">{health.version}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-tertiary">Timestamp</dt>
              <dd className="text-ink-primary">{health.timestamp}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}

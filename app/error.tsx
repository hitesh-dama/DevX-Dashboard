'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {


  return (
    <div className="p-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="mt-2">
          {error.message || 'An unexpected error occurred'}
        </AlertDescription>
        <Button
          onClick={reset}
          variant="outline"
          size="sm"
          className="mt-4"
        >
          Try again
        </Button>
      </Alert>
    </div>
  );
}

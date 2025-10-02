import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <Frown className="w-24 h-24 text-accent mb-4" />
      <h1 className="text-6xl font-bold font-headline text-foreground">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-foreground">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}

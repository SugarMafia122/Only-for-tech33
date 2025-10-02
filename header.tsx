'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Menu, X, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchBar } from './search-bar';
import { useState, Suspense } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function NavLinks({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className={cn('flex items-center gap-4 lg:gap-6', className)}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md',
            pathname === item.href ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
          )}
          onClick={onLinkClick}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-headline font-bold text-lg">
          <BookOpen className="h-6 w-6 text-accent" />
          <span>Tech News Four</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <NavLinks />
          <Button asChild>
            <Link href="/posts/new">
              <PlusCircle />
              New Post
            </Link>
          </Button>
          <div className="w-48">
            <Suspense fallback={null}>
              <SearchBar />
            </Suspense>
          </div>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-8 p-4">
                 <Link href="/" className="flex items-center gap-2 font-headline font-bold text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    <BookOpen className="h-6 w-6 text-accent" />
                    <span>Tech News Four</span>
                </Link>
                <NavLinks className="flex-col items-start gap-4" onLinkClick={() => setIsMobileMenuOpen(false)} />
                 <Button asChild>
                    <Link href="/posts/new" onClick={() => setIsMobileMenuOpen(false)}>
                      <PlusCircle />
                      New Post
                    </Link>
                  </Button>
                  <Suspense fallback={null}>
                    <SearchBar />
                  </Suspense>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

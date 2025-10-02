'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import React from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('q') as string;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        name="q"
        placeholder="Search posts..."
        className="pl-10"
        defaultValue={searchParams.get('q') || ''}
        aria-label="Search posts"
      />
    </form>
  );
}

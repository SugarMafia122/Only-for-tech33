'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Post } from '@/lib/posts';
import { PostCard } from './post-card';

interface SearchResultsProps {
  posts: Post[];
}

export function SearchResults({ posts }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const filteredPosts = useMemo(() => {
    if (!query) {
      return [];
    }
    const lowercasedQuery = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.content.toLowerCase().includes(lowercasedQuery) ||
        post.category.toLowerCase().includes(lowercasedQuery)
    );
  }, [query, posts]);

  if (!query) {
    return <p className="text-center text-muted-foreground">Enter a search term above to find posts.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} for "{query}"
      </h2>
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">No posts found matching your search.</p>
      )}
    </div>
  );
}

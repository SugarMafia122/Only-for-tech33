import type { Post } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="[perspective:1000px]">
      <Card className="flex flex-col overflow-hidden h-full transition-all duration-500 hover:shadow-2xl hover:[transform:rotateY(-10deg)]">
        <Link href={`/posts/${post.slug}`} className="block">
          <div className="relative h-48 w-full">
            <Image
              src={post.imageUrl || 'https://picsum.photos/seed/placeholder/1200/800'}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post.imageHint || 'blog post'}
            />
          </div>
        </Link>
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
              <Badge variant="secondary">{post.category}</Badge>
              <time dateTime={post.date} className="text-sm text-muted-foreground">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
          </div>
          <CardTitle className="font-headline text-xl leading-snug">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/posts/${post.slug}`} className="flex items-center text-sm font-semibold text-accent hover:underline">
            Read more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

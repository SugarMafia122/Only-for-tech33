import { getPosts } from "@/lib/posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/post-card";
import Image from "next/image";

export default function Home() {
  const posts = getPosts();

  return (
    <div className="space-y-12">
      <section className="space-y-8">
        <h2 className="font-headline text-4xl font-bold text-center">Latest in Tech</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, index) => (
            <div
              key={post.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 200 + 800}ms` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>

      <section className="text-center pt-8 sm:pt-16">
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
          Your daily byte of technology news and insights. Stay informed, stay ahead.
        </p>

        <div className="mt-12 w-full max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <Image
                    src="https://picsum.photos/seed/tech-homepage/1200/675"
                    alt="Abstract technology background"
                    fill
                    className="object-cover"
                    data-ai-hint="abstract technology"
                    priority
                />
            </div>
        </div>
      </section>
    </div>
  );
}

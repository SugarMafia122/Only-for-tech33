'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { generateFeaturedImage } from '@/ai/flows/generate-featured-image';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Image as ImageIcon } from 'lucide-react';

interface FeaturedImageProps {
  postTitle: string;
  postContent: string;
  existingImageUrl?: string;
  imageHint?: string;
  altText: string;
}

export function FeaturedImage({
  postTitle,
  postContent,
  existingImageUrl,
  imageHint,
  altText,
}: FeaturedImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(existingImageUrl);
  const [isLoading, setIsLoading] = useState(!existingImageUrl);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!existingImageUrl) {
      const generate = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const result = await generateFeaturedImage({
            postTitle,
            postContent,
            existingImageUrl,
          });

          if (result.shouldGenerateImage && result.imageUrl) {
            setImageUrl(result.imageUrl);
            toast({
              title: "AI-Generated Image",
              description: "A unique featured image was created for this post.",
            });
          } else if (existingImageUrl) {
            setImageUrl(existingImageUrl);
          } else {
             // Fallback if AI decides not to generate and there's no existing image
            setImageUrl(null);
          }
        } catch (e) {
          console.error('Failed to generate featured image:', e);
          setError('Could not generate a featured image at this time.');
          setImageUrl(null);
        } finally {
          setIsLoading(false);
        }
      };
      generate();
    }
  }, [postTitle, postContent, existingImageUrl, toast]);

  if (isLoading) {
    return <Skeleton className="w-full aspect-video rounded-lg" />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <ImageIcon className="h-4 w-4" />
        <AlertTitle>Image Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!imageUrl) {
    // If no image is available and not loading, render nothing.
    return null;
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-cover"
        data-ai-hint={imageHint || 'blog post'}
        priority
      />
    </div>
  );
}

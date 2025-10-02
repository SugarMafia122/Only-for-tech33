import { PlaceHolderImages } from './placeholder-images';

export interface Post {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  imageHint?: string;
}

const posts: Post[] = [
  {
    slug: 'the-technology-behind-modern-anime',
    title: 'The Technology Behind Modern Anime',
    author: 'Alex Ray',
    date: '2024-07-22',
    category: 'Technology',
    excerpt: 'From digital animation techniques to AI-powered tools, we explore the technology that brings breathtaking anime to life.',
    content: `The world of Japanese animation has undergone a dramatic technological evolution. While traditional hand-drawn cel animation has a timeless charm, modern anime production pipelines are filled with cutting-edge digital tools. Software like Clip Studio Paint and Toon Boom Harmony have replaced physical cels, allowing for more efficient workflows and stunning visual effects.

One of the most significant shifts is the integration of 3D CGI. Studios now seamlessly blend 3D models for complex machinery, backgrounds, and even character movements with 2D animation, creating dynamic and immersive scenes that would have been incredibly difficult or time-consuming to draw by hand. This hybrid approach is a hallmark of many modern action-packed series.

Looking ahead, artificial intelligence is poised to revolutionize the industry further. AI-powered tools are being developed to automate in-betweening (the process of drawing frames between key poses), assist with colorization, and even upscale older series to 4K resolution. This technology promises to free up animators to focus on the more creative aspects of their work, pushing the boundaries of visual storytelling even further.`,
    imageUrl: PlaceHolderImages.find(p => p.id === '4')?.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === '4')?.imageHint,
  },
  {
    slug: 'the-rise-of-static-site-generators',
    title: 'The Rise of Static Site Generators',
    author: 'Alex Ray',
    date: '2024-07-15',
    category: 'Technology',
    excerpt: 'Why are developers moving away from complex CMSs and back to basics? A deep dive into the benefits of static site generators like Next.js and Hugo.',
    content: `For years, the web development world was dominated by database-driven Content Management Systems (CMS) like WordPress and Drupal. They offered power and flexibility, but often at the cost of performance, security, and complexity. Enter the modern static site generator (SSG).

The concept is simple: instead of generating a page on every request, SSGs pre-build all the pages of your site into a set of static HTML, CSS, and JavaScript files. These files can then be served from a simple web server or a Content Delivery Network (CDN). The result? Blazing-fast load times, a reduced attack surface for security threats, and a simpler, more streamlined development workflow.

Frameworks like Next.js (with its static export feature), Gatsby, and Hugo are leading this charge. They combine the benefits of static sites with the power of modern JavaScript frameworks, allowing for dynamic, interactive experiences without sacrificing performance. This approach, often called the Jamstack (JavaScript, APIs, and Markup), represents a fundamental shift in how we build for the web, prioritizing speed and user experience above all else.`,
  },
  {
    slug: 'designing-for-accessibility',
    title: 'Designing for Accessibility',
    author: 'Alex Ray',
    date: '2024-06-18',
    category: 'Technology',
    excerpt: 'Accessibility is not a feature, it\'s a fundamental part of good design. Practical tips for creating more inclusive digital experiences.',
    content: `Web accessibility (often abbreviated as a11y) is the practice of ensuring that your websites and applications are usable by everyone, regardless of their abilities or disabilities. This includes people with visual, auditory, motor, and cognitive impairments. Too often, accessibility is treated as an afterthought or a compliance checkbox. But in reality, it is a core tenet of user-centered design.

Simple changes can make a huge difference. Using semantic HTML (e.g., <nav>, <main>, <button>) provides structure for screen readers. Ensuring sufficient color contrast helps users with low vision. Providing alternative text for images gives context to those who cannot see them. Making sure all functionality is accessible via a keyboard is crucial for users who cannot use a mouse.

Ultimately, designing for accessibility benefits everyone. A clear, well-structured site with readable text and intuitive navigation is a better experience for all users, not just those with disabilities. By embracing accessibility from the start of the design process, we can build a more inclusive and equitable web.`,
    imageUrl: PlaceHolderImages.find(p => p.id === '4')?.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === '4')?.imageHint,
  },
];

export function getPosts(): Post[] {
  // In a real app, you'd fetch this from a database or a file system.
  // For this demo, we'll just return the in-memory array.
  // The server action will add to this array.
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getCategories(): string[] {
  const categories = posts.map((post) => post.category);
  return ['Technology', ...Array.from(new Set(categories))].filter(c => c === 'Technology');
}

export function getPostsByCategory(category: string): Post[] {
  if (category.toLowerCase() === 'technology') {
    return getPosts();
  }
  return getPosts().filter((post) => post.category.toLowerCase() === category.toLowerCase());
}

// This function is not ideal for a real app, but for a demo it's fine.
// It mutates the posts array in memory.
export function addPost(post: Omit<Post, 'slug' | 'date' | 'excerpt'>, imageUrl?: string) {
  const slug = post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  const newPost: Post = {
    ...post,
    slug,
    date: new Date().toISOString(),
    excerpt: post.content.substring(0, 150) + '...',
    imageUrl: imageUrl,
    imageHint: 'custom image'
  };
  posts.unshift(newPost); // Add to the beginning of the array
  return newPost;
}

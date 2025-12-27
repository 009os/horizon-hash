/**
 * Database response types
 */

export interface DatabaseAuthor {
  name: string;
  picture: string | null;
}

export interface DatabasePost {
  slug: string;
  title: string;
  date: string;
  cover_image: string | null;
  author_id: string | null;
  author?: DatabaseAuthor | null;
  excerpt: string | null;
  og_image_url: string | null;
  content: string;
  preview: boolean;
}


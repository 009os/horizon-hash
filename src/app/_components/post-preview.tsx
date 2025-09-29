import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author | null;
  slug: string;
  content?: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  content,
}: Props) {
  return (
    <Link href={`/posts/${slug}`} className="block">
      <div className="clickable-card p-4 sm:p-6 rounded-lg bg-gray-800/50 shadow-sm cursor-pointer backdrop-blur-sm border border-gray-700">
        <div className="mb-4 sm:mb-6 hover:scale-102 transition-transform duration-300">
          <CoverImage slug={slug} title={title} src={coverImage} disableLink={true} />
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 leading-snug hover:scale-102 transition-transform duration-300 text-white">
          {title}
        </h3>
        <div className="text-sm sm:text-lg mb-3 sm:mb-5 text-gray-300">
          <DateFormatter dateString={date} />
          {content && (
            <div className="mt-1 text-xs sm:text-sm text-gray-400">
              {formatReadingTime(calculateReadingTime(content))}
            </div>
          )}
          {author && (
            <div className="mt-1 text-xs sm:text-sm" style={{ color: 'white' }}>
              by {author.name}
            </div>
          )}
        </div>
        <p className="text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6 text-gray-300">{excerpt}</p>
        {author && (
          <div className="hover-lift">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        )}
      </div>
    </Link>
  );
}

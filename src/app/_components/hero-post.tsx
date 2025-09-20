import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author | null;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <Link href={`/posts/${slug}`} className="block">
      <section className="clickable-card p-3 sm:p-4 rounded-lg bg-gray-800/50 shadow-sm cursor-pointer backdrop-blur-sm border border-gray-700">
        <div className="mb-4 sm:mb-6">
          <CoverImage title={title} src={coverImage} slug={slug} disableLink={true} />
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-8 md:mb-12 lg:mb-16">
          <div className="mb-6 md:mb-0">
            <h3 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl leading-tight hover:scale-102 transition-transform duration-300 text-white">
              {title}
            </h3>
            <div className="mb-3 sm:mb-4 md:mb-0 text-sm sm:text-base text-gray-300">
              <DateFormatter dateString={date} />
              {author && (
                <div className="mt-1 text-xs sm:text-sm" style={{ color: 'white' }}>
                  by {author.name}
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm sm:text-base leading-relaxed mb-4 text-gray-300">{excerpt}</p>
            {author && (
              <div className="hover-lift">
                <Avatar name={author.name} picture={author.picture} />
              </div>
            )}
          </div>
        </div>
      </section>
    </Link>
  );
}

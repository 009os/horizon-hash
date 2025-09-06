import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author | null;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <Link href={`/posts/${slug}`} className="block">
      <div className="clickable-card p-4 sm:p-6 rounded-lg bg-white shadow-sm cursor-pointer">
        <div className="mb-4 sm:mb-6 hover:scale-102 transition-transform duration-300">
          <CoverImage slug={slug} title={title} src={coverImage} disableLink={true} />
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 leading-snug hover:scale-102 transition-transform duration-300">
          {title}
        </h3>
        <div className="text-sm sm:text-lg mb-3 sm:mb-5">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6">{excerpt}</p>
        {author && (
          <div className="hover-lift">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        )}
      </div>
    </Link>
  );
}

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author | null;
  content?: string;
};

export function PostHeader({ title, coverImage, date, author, content }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {author && (
        <div className="hidden md:block md:mb-12">
          <Avatar name={author.name} picture={author.picture} textColor="black" />
        </div>
      )}
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-4xl mx-auto">
        {author && (
          <div className="block md:hidden mb-6">
            <Avatar name={author.name} picture={author.picture} textColor="black" />
          </div>
        )}
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
          {content && (
            <div className="mt-2 text-sm text-gray-500">
              {formatReadingTime(calculateReadingTime(content))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

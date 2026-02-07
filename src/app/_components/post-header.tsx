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
  viewCounter?: React.ReactNode;
};

export function PostHeader({ title, coverImage, date, author, content, viewCounter }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {author && (
        <div className="hidden md:block md:mb-12">
          <div className="flex justify-between items-center">
            <Avatar name={author.name} picture={author.picture} textColor="#3d3630" />
            <div className="flex-shrink-0">
              {viewCounter}
            </div>
          </div>
        </div>
      )}
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-4xl mx-auto">
        {author && (
          <div className="block md:hidden mb-6">
            <div className="flex justify-between items-center">
              <Avatar name={author.name} picture={author.picture} textColor="#3d3630" />
              <div className="flex-shrink-0">
                {viewCounter}
              </div>
            </div>
          </div>
        )}
        <div className="mb-6 text-lg journal-muted">
          <DateFormatter dateString={date} />
          {content && (
            <div className="mt-2 text-sm text-[#5c5248]">
              {formatReadingTime(calculateReadingTime(content))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

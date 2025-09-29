import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section className="p-3 sm:p-6">
      <h2 className="mb-6 sm:mb-10 text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-tight hover:scale-102 transition-transform duration-300 text-white">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-20 gap-y-16 sm:gap-y-24 md:gap-y-32 mb-20 sm:mb-32">
        {posts.map((post) => (
          <div key={post.slug}>
            <PostPreview
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              content={post.content}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

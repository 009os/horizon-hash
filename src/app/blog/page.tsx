import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { apiClient } from "@/core/api/client";
import BlogFooter from "@/app/_components/blog-footer";
import ServerOverloaded from "@/app/_components/server-overloaded";
import { DatabaseError, NetworkError } from "@/core/errors/app-error";
import { logger } from "@/core/utils/logger";

const MAIN_STYLES = "min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative";
const BACKGROUND_STYLE = { backdropFilter: 'blur(1px)', backgroundAttachment: 'fixed' as const };

export default async function Blog() {
  try {
    const allPosts = await apiClient.getPosts();

    if (allPosts.length === 0) {
      return (
        <main className={MAIN_STYLES} style={BACKGROUND_STYLE}>
          <Container>
            <Intro />
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-white mb-4">No Articles Found</h2>
              <p className="text-gray-300 mb-8">
                It looks like there are no articles available yet.
              </p>
            </div>
          </Container>
          <BlogFooter />
        </main>
      );
    }

    const [heroPost, ...morePosts] = allPosts;

    return (
      <main className={MAIN_STYLES} style={BACKGROUND_STYLE}>
        <Container>
          <Intro />
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            content={heroPost.content}
          />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
        <BlogFooter />
      </main>
    );
  } catch (error) {
    logger.error('Failed to load blog posts', error);
    
    // Handle all known error types gracefully
    if (error instanceof DatabaseError || error instanceof NetworkError) {
      return <ServerOverloaded />;
    }
    
    // For unknown errors, still show the error page instead of crashing
    logger.error('Unexpected error type', error);
    return <ServerOverloaded />;
  }
}

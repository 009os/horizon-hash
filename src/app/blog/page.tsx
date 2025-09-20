import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Footer from "@/app/_components/footer";
import ServerOverloaded from "@/app/_components/server-overloaded";

export default async function Blog() {
  try {
    const allPosts = await getAllPosts();

    // Handle case when no posts are available
    if (!allPosts || allPosts.length === 0) {
      return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative" style={{
          backdropFilter: 'blur(1px)',
          backgroundAttachment: 'fixed'
        }}>
          <div className="bg-gray-800/50 shadow-sm border-b border-gray-700 backdrop-blur-sm">
            <Container>
              <div className="py-4">
                <Link 
                  href="/" 
                  className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </Container>
          </div>

          <Container>
            <Intro />
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-white mb-4">No Articles Found</h2>
              <p className="text-gray-300 mb-8">
                It looks like there are no articles available yet. This might be because:
              </p>
              <ul className="text-left max-w-md mx-auto text-gray-300 space-y-2">
                <li>• The database connection is not configured</li>
                <li>• Articles haven't been migrated yet</li>
                <li>• All articles are in preview mode</li>
              </ul>
              <div className="mt-8">
                <a 
                  href="https://supabase.com/dashboard" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Supabase Dashboard
                </a>
              </div>
            </div>
          </Container>
          
          <Footer />
        </main>
      );
    }

    const heroPost = allPosts[0];
    const morePosts = allPosts.slice(1);

    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative" style={{
        backdropFilter: 'blur(1px)',
        backgroundAttachment: 'fixed'
      }}>
        {/* Back to Home Button */}
        <div className="bg-gray-800/50 shadow-sm border-b border-gray-700 backdrop-blur-sm">
          <Container>
            <div className="py-4">
              <Link 
                href="/" 
                className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
            </div>
          </Container>
        </div>

        <Container>
          <Intro />
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
        
        <Footer />
      </main>
    );
  } catch (error) {
    console.error('🚀 Server overloaded! Database connection failed:', error);
    return <ServerOverloaded />;
  }
}

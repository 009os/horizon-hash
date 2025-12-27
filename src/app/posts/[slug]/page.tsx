import { Metadata } from "next";
import { notFound } from "next/navigation";
import { apiClient } from "@/core/api/client";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import ServerOverloaded from "@/app/_components/server-overloaded";
import BlogFooter from "@/app/_components/blog-footer";
import ViewCounter from "@/app/_components/view-counter";
import BackToBlogButton from "@/app/_components/back-to-blog-button";
import { NotFoundError, DatabaseError, NetworkError } from "@/core/errors/app-error";
import { logger } from "@/core/utils/logger";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Post({ params }: Params) {
  try {
    const { slug } = await params;
    const post = await apiClient.getPost(slug);
    const content = await markdownToHtml(post.content || "");

    return (
      <main>
        <Alert preview={post.preview} />
        <div className="fixed top-6 left-4 md:top-28 md:left-16 z-50">
          <BackToBlogButton />
        </div>
        <Container>
          <article className="mb-32">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              content={post.content}
              viewCounter={<ViewCounter slug={slug} />}
            />
            <PostBody content={content} />
          </article>
        </Container>
        <BlogFooter />
      </main>
    );
  } catch (error) {
    if (error instanceof NotFoundError) {
      return notFound();
    }
    logger.error('Failed to load post', error);
    if (error instanceof DatabaseError || error instanceof NetworkError) {
      return <ServerOverloaded />;
    }
    // For unknown errors, show error page instead of crashing
    return <ServerOverloaded />;
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await apiClient.getPost(slug);
    const title = `${post.title} | ${CMS_NAME}`;

    return {
      title,
      openGraph: {
        title,
        images: [post.ogImage.url],
      },
    };
  } catch (error) {
    logger.error('Failed to generate metadata', error);
    return {
      title: `Error | ${CMS_NAME}`,
      description: 'Unable to load post metadata.',
    };
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const posts = await apiClient.getPosts();
    return posts.map(post => ({ slug: post.slug }));
  } catch (error) {
    logger.error('Failed to generate static params', error);
    return [];
  }
}

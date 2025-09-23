import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import ServerOverloaded from "@/app/_components/server-overloaded";

export default async function Post(props: Params) {
  try {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return notFound();
    }

    const content = await markdownToHtml(post.content || "");

    return (
      <main>
        <Alert preview={post.preview} />
        <Container>
          <article className="mb-32">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <PostBody content={content} />
          </article>
        </Container>
      </main>
    );
  } catch (error) {
    console.error('🚀 Server overloaded! Database connection failed:', error);
    return <ServerOverloaded />;
  }
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  try {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return notFound();
    }

    const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

    return {
      title,
      openGraph: {
        title,
        images: [post.ogImage.url],
      },
    };
  } catch (error) {
    console.error('🚀 Server overloaded! Database connection failed:', error);
    return {
      title: 'Server Overloaded | Horizon Hash',
      description: 'Our servers are working overtime! Please try again later.',
    };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('🚀 Server overloaded! Database connection failed:', error);
    return [];
  }
}

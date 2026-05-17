import { GetStaticPaths, GetStaticProps } from "next";
import { blogPosts, BlogPost } from "@/lib/blogData";
import BlogPostLayout from "@/components/BlogPostLayout";

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostPage({ post, relatedPosts }: Props) {
  return <BlogPostLayout post={post} relatedPosts={relatedPosts} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: blogPosts.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { notFound: true };

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return { props: { post, relatedPosts } };
};

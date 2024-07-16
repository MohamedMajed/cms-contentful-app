import Link from "next/link";
import { draftMode } from "next/headers";

import NewArrivals from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import CoverImage from "../../cover-image";

import { Markdown } from "@/lib/markdown";
import { getAllCategories, getPostAndMorePosts, getCategory, getAllPostsInCategory } from "@/lib/api";

export async function generateStaticParams() {
  const allCategories = await getAllCategories();

  return allCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  console.log('blabla params.slug')
  console.log(params.slug)
  const category = await getCategory(params.slug);
  const { posts, pagination } = await getAllPostsInCategory(params.slug, isEnabled, { limit: 6 });

  return (
    <div className="container mx-auto px-5">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        / {category.name}
      </h2>
      <ul className="list-none mb-20">
      {posts.map((post: { id: number; slug: string; name: string; date: string }) => (
  <li key={post.id} className="mb-10">
    <h3 className="text-lg font-bold leading-tight tracking-tighter">
      <Link href={`/categories/${post.slug}`} className="hover:underline">
        {post.name}
      </Link>
    </h3>
    <div className="text-sm text-gray-600">
      <Date dateString={post.date} />
    </div>
  </li>
))}
      </ul>
      {pagination.hasNextPage && (
        <div className="flex justify-center mb-20">
          <Link
            href={`/categories/${params.slug}/${pagination.nextPage}`}
            className="bg-accent-1 hover:bg-accent-2 text-white font-bold py-2 px-4 rounded"
          >
            Load more
          </Link>
        </div>
      )}
    </div>
  );
}
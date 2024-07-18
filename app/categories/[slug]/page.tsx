import Link from "next/link";
import { draftMode } from "next/headers";
import NewArrivals from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import { PostPreview } from "@/app/more-stories";
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
      {/* <div className="title">
        <Link href="/">
          {category.title}
        </Link>
      </div> */}
      <div className="CategoryPage">
        <div className="title">{category.title}</div>
      </div>
      <ul className="list-none mb-20">
        {posts.map((post: { id: number; slug: string; name: string; description: string; price: number; quantity: number; thumbnail: any }) => (
          <li key={post.id} className="mb-10">
            <h3 className="text-lg font-small leading-tight tracking-tighter">
              <Link href={`/posts/${post.slug}`}>
                <PostPreview
                  name={post.name}
                  slug={post.slug}
                  description={post.description}
                  thumbnail={post.thumbnail.url}
                  price={post.price}
                  quantity={post.quantity}
                />
              </Link>
            </h3>
          </li>
        ))}
      </ul>
      {pagination.hasNextPage && (
        <div className="flex justify-center mb-20">
          <Link
            href={`/categories/${params.slug}/${pagination.nextPage}`}
            className="bg-accent-1 hover:bg-accent-2 text-black font-bold py-2 px-4 rounded hover:underline">
            Load more
          </Link>
        </div>
      )}
    </div>
  );
}
import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";
function PostPreview({
  name,
  slug,
  description,
  thumbnail,
  price,
  quantity,
  // postsCollection,
}: {
  name: string;
  slug: string;
  description: string;
  thumbnail: any;
  price: number;
  quantity: number;
  // postsCollection: any;
}) {
  console.log('asdwd', thumbnail)
  return (
    <div>
      
      <div className="mb-5">
        <CoverImage title={name} slug={slug} url={thumbnail} />
      </div>
      
      {/* <h3 className="text-3xl mb-3 leading-snug"> */}
        {/* <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link> */}
      {/* </h3> */}
      {/* <div className="text-lg mb-4"> */}
        {/* <DateComponent dateString={date} /> */}
      {/* </div> */}
      {/* <p className="text-lg leading-relaxed mb-4"></p>
      {title && <Avatar name={title} thumbnail={image.picture} />} */}
    </div>
  );
}
export default function NewArrivals({ category }: { category: any }) {
  const posts = category?.postsCollection?.items ?? [];
  console.log('category.namasde', category.title)
  console.log('posts.namasde', posts[0])
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        {category.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post: any) => (
          <PostPreview
            key={post.slug}
            name={post.title}
            slug={post.slug}
            description={post.description}
            thumbnail={post.thumbnail.url}
            price={post.price}
            quantity={post.quantity}
            // postsCollection={post.postsCollection}
          />
        ))}
      </div>
    </section>
  );
}
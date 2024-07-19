import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";
import { title } from "process";

export function PostPreview({
  name,
  slug,
  description,
  thumbnail,
  price,
  quantity,
}: {
  name: string;
  slug: string;
  description: string;
  thumbnail: any;
  price: number;
  quantity: number;
}) {
  return (
    <div className="PostPreview">
      <div className="mb-5 flex">
        <CoverImage title={name} slug={slug} url={thumbnail} />
        <div className="description ml-8">{description}</div>
      </div>
      <div className="post-info">
        <p className="price">{name}</p>
        <div className="flex justify-between mb-4">
          <p>${price}</p>
          <p className="quantity">Quantity: {quantity}</p>
        </div>
      </div>
    </div>
  );
}


export default function NewArrivals({ posts }: { posts: any }) {
  // const posts = category?.postsCollection?.items ?? [];
  console.log('pmwy', posts)
  return (
    <section className="NewArrivals grid grid-cols-1 gap-4">
      {/* <div className="title">{category.title}</div> */}      
      <div className="title">New Arrivals</div>
      {posts.map((post: any) => (
        <div key={post.slug} className="PostPreviewContainer">
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
        </div>
      ))}
    </section>
  );
}
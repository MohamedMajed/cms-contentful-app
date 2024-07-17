import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";
import { title } from "process";

function PostPreview({
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
        <div className="description ml-4">{description}</div>
      </div>
      <div className="post-info">
        <h3>{name}</h3>
        <div className="flex justify-between mb-4">
          <p className="price">${price}</p>
          <p className="quantity">Quantity: {quantity}</p>
        </div>
      </div>
    </div>
  );
}


export default function NewArrivals({ category }: { category: any }) {
  const posts = category?.postsCollection?.items ?? [];
  return (
    <section className="NewArrivals grid grid-cols-1 gap-4">
      <h2>{category.title}</h2>
      {posts.map((post: any) => (
        <div key={post.slug} className="PostPreviewContainer">
          <PostPreview
            name={post.title}
            slug={post.slug}
            description={post.description}
            thumbnail={post.thumbnail.url}
            price={post.price}
            quantity={post.quantity}
          />
        </div>
      ))}
    </section>
  );
}
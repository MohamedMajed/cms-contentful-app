import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";

function PostPreview({
  title,
  slug,
  description,
  image,
  // postsCollection,
}: {
  title: string;
  slug: string;
  description: string;
  image: any;
  // postsCollection: any;
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage title={title} slug={slug} url={image.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        {/* <DateComponent dateString={date} /> */}
      </div>
      <p className="text-lg leading-relaxed mb-4"></p>
      {title && <Avatar name={title} thumbnail={image.picture} />}
    </div>
  );
}

export default function MoreStories({ moreCategories: moreCategories }: { moreCategories: any[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {moreCategories.map((category) => (
          <PostPreview
            key={category.slug}
            title={category.name}
            image={category.image}
            slug={category.slug}
            description={category.description}
            // postsCollection={heroPost.postsCollection}
            
          />
        ))}
      </div>
    </section>
  );
}

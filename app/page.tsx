import Link from "next/link";
import Button from '@mui/material/Button';
import ImageSlider from "./components/slider";
import NewArrivals from "./new-arrivals";

import { getAllCategories, getAllPosts } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href={CMS_URL}
          className="underline hover:text-success duration-200 transition-colors"
        >
          {CMS_NAME}
        </a>
        .
      </h2>
    </section>
  );
}

function TopCategories({
  categories,
}: {
  categories: {
    title: string;
    slug: string;
    image: any;
  }[];
}) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20 pt-20 px-20">
      {categories.slice(0, 4).map((category) => (
        <div key={category.slug} className="relative">
          <Link href={`/categories/${category.slug}`}>
            <div className="overflow-hidden"> {/* Add a wrapper div */}
              <img
                src={category.image.url}
                alt={category.title}
                className="w-full h-full object-cover rounded-lg transition duration-300 ease-in-out hover:scale-110 hover:rounded-lg"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </Link>
          <div className="absolute flex justify-center items-center left-1/2 bottom-1 -translate-x-1/2 -translate-y-1/2 shadow-md">
            <div className="bg-white p-2">
              <div className="text-base font-semibold text-grey px-4">
                {category.title}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default async function Page() {
  // const { isEnabled } = draftMode();
  const allCategories = await getAllCategories();
  const allPosts = await getAllPosts();
  console.log('pl,m,,asodqzzlll', allPosts)
  const newArrivalsCategory = allCategories.find((category) => category.title === "New Arrivals");
  console.log('newArrivalsCategory', newArrivalsCategory.postsCollection)

  return (
    <div className="mx-auto">
      <ImageSlider allCategories={allCategories} />
      <TopCategories categories={allCategories} />
      <NewArrivals posts={allPosts} />
    </div>
  );
}
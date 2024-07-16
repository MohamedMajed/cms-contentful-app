import Link from "next/link";
import { draftMode } from "next/headers";
import { Button } from 'antd';
import ImageSlider from "./components/slider";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import NewArrivals from "./more-stories";

import { getAllCategories } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";
import Head from "next/head";

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

function Header() {
  return (
    <header className="flex justify-between items-center py-4 bg-gray-100 shadow-md">
      <nav className="flex items-center">
        <ul className="flex items-center">
          <li className="mr-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition duration-300">Phones</Link>
          </li>
          <li className="mr-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition duration-300">Clothes</Link>
          </li>
          <li className="mr-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition duration-300">Deals</Link>
          </li>
          <li className="mr-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition duration-300">Computers</Link>
          </li>
          <li className="mr-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition duration-300">Fashion</Link>
          </li>
          
        </ul>
      </nav>
    </header>
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
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20 pt-10">
      {categories.slice(0, 6).map((category) => (
        <div key={category.slug} className="relative">
          <Link href={`/categories/${category.slug}`}>
            <img
              src={category.image.url}
              alt={category.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
          <div className="absolute bottom-0 left-0 p-4 text-lg font-bold text-white">
            {category.title}
          </div>
        </div>
      ))}
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allCategories = await getAllCategories();
  const heroPost = allCategories[0];
  const moreCategories = allCategories.slice(1);

  const sliderImages = allCategories.map((category) => category.image);
  const newArrivalsCategory = allCategories.find((category) => category.title === "New Arrivals");
  console.log('newArrivalsCategory', newArrivalsCategory.slug)

  return (
    <div className="container mx-auto px-5">
      <Header />
      <ImageSlider allCategories={allCategories} />
      <TopCategories categories={allCategories} />
      <NewArrivals category={newArrivalsCategory} />
    </div>
  );
}
import Link from "next/link";
import { Image } from 'antd';
import { Badge } from 'antd';

export default function NewArrivals({ posts }: { posts: any }) {
  console.log('pmwy', posts)
  return (
    <section className="pt-16">
      {/* <div className="flex justify-center"> */}
      <h2 className="text-4xl font-bold text-center mb-1"> New Arrivals </h2>
      <h1 className="text-lg text-center custom-header mb-4"> Top view in this week </h1>
      <div className="grid grid-cols-4 md:grid-cols-4 gap-32 pt-6 pl-16 flex">
        {posts.slice(0, 10).map((post: any) => (
          <Link key={post.id} href={`/posts/${post.slug}`}>
            <div className="block mx-2 p-0">
              <div className=" justify-center my-0 mx-0">
                <Image
                  width={250}
                  height={350}
                  src={post.thumbnail.url}            
                />
                <div >
                  <p className="font-sans font-medium text-sm">{post.name}</p>
                  <p className="text-sm text-gray-500">${post.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
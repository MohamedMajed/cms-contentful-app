'use client';

import { useState } from 'react';

import Link from 'next/link';


interface Pagination {
  hasNextPage: boolean;
  nextPage: number;
}
interface PostListProps {
  initialProducts: any;
  slug: string;
  initialPagination: Pagination;
}
export default function ProductList({ initialProducts: initialPosts, slug, initialPagination }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const loadMorePosts = async () => {
    if (!pagination.hasNextPage) return;
    const nextPage = pagination.nextPage;
    const response = await fetch(`/api/posts?slug=${slug}&page=${nextPage}`);
    const data = await response.json();
    setPosts((prevPosts: any) => [...prevPosts, ...data.posts]);
    setPagination(data.pagination);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Link key={post.id} href={`/posts/${post.slug}`}>
            <div className="block">
              <div className="border rounded-lg overflow-hidden shadow-md">
                <img className="w-full h-48 object-cover" src={post.thumbnail.url} alt={post.name} />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{post.name}</h2>
                  <p className="text-gray-600">${post.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {pagination.hasNextPage && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMorePosts}
            className="load-more-btn px-32"
          >
            Load More
          </button>
        </div>        
      )}
    </>
  );
}
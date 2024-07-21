import { draftMode } from 'next/headers';
import { getAllCategories, getCategory, getAllPostsInCategory } from '@/lib/api';
import ProductList from './productlist';
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
  const category = await getCategory(params.slug);
  const { posts, pagination } = await getAllPostsInCategory(params.slug, isEnabled, { limit: 6 });
  return (
    <div className="container mx-auto px-5">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{category.title}</h1>
      </div>
      <ProductList initialProducts={posts} slug={params.slug} initialPagination={pagination} />
    </div>
  );
}







// import Link from "next/link";
// import { draftMode } from "next/headers";
// import NewArrivals from "../../new-arrivals";
// import Avatar from "../../avatar";
// import Date from "../../date";
// import { getAllCategories, getPostAndMorePosts, getCategory, getAllPostsInCategory, getAllPosts } from "@/lib/api";
// import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
// import Head from 'next/head';

// export async function generateStaticParams() {
//   const allCategories = await getAllCategories();

//   return allCategories.map((category) => ({
//     slug: category.slug,
//   }));
// }

// export default async function CategoryPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { isEnabled } = draftMode();
//   console.log('blabla params.slug')
//   console.log(params.slug)
//   const category = await getCategory(params.slug);
//   const { posts, pagination } = await getAllPostsInCategory(params.slug, isEnabled, { limit: 6 });

//   return (
//     <div className="container mx-auto px-5">
//       <div className="CategoryPage">
//         <div className="title">{category.title}</div>
//       </div>
//       <Grid container spacing={2}>
//         {posts.map((post: any) => (
//           <Grid item key={post.id} xs={12} sm={6} md={4}>
//             <Link href={`/posts/${post.slug}`}>
//               <Card>
//                 <CardMedia component="img" height="140" image={post.thumbnail.url} alt={post.name} />
//                 <CardContent>
//                   <Typography variant="h5" component="h2">
//                     {post.name}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     ${post.price}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Link>
//           </Grid>
//         ))}
//       </Grid>
//       {pagination.hasNextPage && (
//         <div className="flex justify-center mb-20">
//           <Link href={`/categories/${params.slug}/${pagination.nextPage}`} className="load-more-btn">
//             Load more
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

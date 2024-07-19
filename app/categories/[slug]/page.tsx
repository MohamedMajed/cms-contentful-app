import Link from "next/link";
import { draftMode } from "next/headers";
import NewArrivals from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import { PostPreview } from "@/app/more-stories";
import { getAllCategories, getPostAndMorePosts, getCategory, getAllPostsInCategory, getAllPosts } from "@/lib/api";
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

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
      <div className="CategoryPage">
        <div className="title">{category.title}</div>
      </div>
      <Grid container spacing={0}>
        {posts.map((post: any) => (
          <Link href={`/posts/${post.slug}`}>
            <Grid item key={post.id} xs={3} sm={3} md={3} lg={3}>
              <Card>
                <CardMedia component="img" height="140" image={post.thumbnail.url} alt={post.name} />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {post.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${post.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Link>
        ))}
      </Grid>
      {pagination.hasNextPage && (
        <div className="flex justify-center mb-20">
          <Link
            href={`/categories/${params.slug}/${pagination.nextPage}`}
            className="load-more-btn">
            Load more
          </Link>          
        </div>
      )}
    </div>
  );
}
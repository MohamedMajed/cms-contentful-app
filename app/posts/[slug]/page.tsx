import { getPostBySlug, getAllPosts } from "@/lib/api";

export async function generateStaticParams() {
    const allPosts = await getAllPosts();

    return allPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = await getPostBySlug(params.slug);
    console.log('blabla params.slug')

    return (
        <div className="container mx-auto px-5">
            <h1>{post.name}</h1>
            <img src={post.thumbnail.url} alt={post.name} />
            <p>{post.description}</p>
            <p>Price: ${post.price}</p>
            <p>Quantity: {post.quantity}</p>
        </div>
    );
}
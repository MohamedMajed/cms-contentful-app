const CATEGORY_GRAPHQL_FIELDS = `
  title
  slug
  description
  image {
    url
  }
  postsCollection(limit: 10) {
    items {
      ... on Post {
        name
        slug
        thumbnail {
          url
        }
        description
        price
        quantity
      }
    }
  }
`;

const POST_GRAPHQL_FIELDS = `
  name
  slug
  thumbnail {
    url
  }
  description
  price
  quantity
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    },
  ).then((response) => response.json());
}

function extractCategory(fetchResponse: any): any {
  console.log('blabla extractCategory')
  console.log(fetchResponse?.data?.categoryCollection?.items?.[0])
  return fetchResponse?.data?.categoryCollection?.items?.[0];
}

function extractCategories(fetchResponse: any): any[] {  
  return fetchResponse?.data?.categoryCollection?.items;
}

function extractPost(fetchResponse: any): any {
  console.log('blabla extractPost')
  console.log(fetchResponse?.data?.postCollection?.items?.[0])
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPosts(fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getCategory(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      categoryCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${CATEGORY_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return extractCategory(entry);
}

export async function getAllPostsInCategory(
  categorySlug: string,
  isEnabled: boolean,
  options: { limit: number; page?: number } = { limit: 6 }
) {
  const category = await getCategory(categorySlug);
  console.log('asjhdgjah')
  console.log(category)
  const postsQuery = `
    query {
      categoryCollection(where: { slug: "${categorySlug}" }, limit: 1) {
        items {
          postsCollection(limit: ${options.limit}, skip: ${options.page? (options.page - 1) * options.limit : 0}) {
            items {
             ... on Post {
                ${POST_GRAPHQL_FIELDS}
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(postsQuery, isEnabled);
  console.log('Response:', response);
  const data = response.data;
  console.log('response.data:', response.data);
  console.log(JSON.stringify(response.data, null, 3));
  const categoryCollection = data.categoryCollection;
  console.log('Resasdponse:', categoryCollection);
  const posts = categoryCollection && categoryCollection.items[0].postsCollection.items;
  console.log('Resasdpoasdjghnse:', posts);
  const pagination = {
    hasNextPage: posts.length === options.limit,
    nextPage: options.page? options.page + 1 : 2,
  };
  console.log(posts.length)

  return { posts, pagination };
}

export async function getAllCategories(): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      categoryCollection(order: title_ASC) {
        items {
          ${CATEGORY_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return extractCategories(entries);
}

export async function getPostBySlug(slug: string | null, preview: boolean): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${preview ? "true" : "false"}, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: name_DESC, preview: ${isDraftMode ? "true" : "false"}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  return extractPosts(entries);
}

export async function getPostAndMorePosts(slug: string, preview: boolean): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${preview ? "true" : "false"}, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${preview ? "true" : "false"}, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    post: extractPost(entry),
    morePosts: extractPosts(entries),
  };
}
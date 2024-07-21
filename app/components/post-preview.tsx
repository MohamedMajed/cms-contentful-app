// import CoverImage from "./cover-image";

export default function PostPreview({
    name,
    slug,
    description,
    thumbnail,
    price,
    quantity,
    hoverImage,
  }: {
    name: string;
    slug: string;
    description: string;
    thumbnail: any;
    hoverImage: any;
    price: number;
    quantity: number;
  }) {
    return (
      <div className="PostPreview">
        <div className="mb-5 flex">
          {/* <CoverImage title={name} slug={slug} url={thumbnail} /> */}
          <div className="description ml-8">{description}</div>
        </div>
        <div className="post-info">
          <p className="price">{name}</p>
          <div className="flex justify-between mb-4">
            <p>${price}</p>
            <p className="quantity">Quantity: {quantity}</p>
          </div>
        </div>
      </div>
    );
  }
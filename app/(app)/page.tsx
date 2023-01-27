import Main from "@/components/Main";
import {
  PortableText,
  PortableTextComponents,
  PortableTextTypeComponentProps,
} from "@portabletext/react";
import { getArticle } from "@/lib/sanity.client";
import Image from "@/components/Image";
import { RandomImage } from "@/lib/sanity.query";
import ImageViewerOpener from "@/components/image-viewer/ImageViewerOpener";

const portableTextComponents: PortableTextComponents = {
  types: {
    randomImage: ({
      value,
      index,
    }: PortableTextTypeComponentProps<RandomImage>) => {
      // console.log(index);
      const { preview, aspectRatio, image, caption } = value;
      return (
        <ImageViewerOpener as="div" imageOrIndex={value}>
          <figure>
            <div
              className="relative border border-gray-800"
              style={{
                backgroundImage: `url(${preview})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                imageRendering: "pixelated",
                paddingBottom: `${(1 / aspectRatio) * 100}%`,
              }}
            >
              <Image className="absolute inset-0" image={image} alt={caption} />
            </div>
            <figcaption className="text-sm text-gray-400 p-1">
              {caption}
            </figcaption>
          </figure>
        </ImageViewerOpener>
      );
    },
  },
};

export default async function Home() {
  const article = await getArticle();
  const images = article.content.filter(
    (block) => block._type === "randomImage"
  );
  // console.log(article);
  // console.log(images);
  return (
    <Main images={images} className="max-w-5xl p-4">
      <h1 className="font-bold text-4xl my-6">{article.title}</h1>
      <div className="space-y-3">
        <PortableText
          value={article.content}
          components={portableTextComponents}
        />
      </div>
    </Main>
  );
}

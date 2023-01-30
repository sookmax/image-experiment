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
import { getAspectRatioAfterCrop } from "@/lib/sanity.image";

const portableTextComponents: PortableTextComponents = {
  types: {
    randomImage: ({
      value,
      index,
    }: PortableTextTypeComponentProps<RandomImage>) => {
      // console.log(index);
      const { preview, image, caption } = value;

      const aspectRatioAfterCrop = getAspectRatioAfterCrop(value);

      return (
        <ImageViewerOpener as="div" imageOrIndex={value}>
          <figure className="my-4">
            <div
              className="relative"
              style={{
                backgroundImage: `url(${preview})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                imageRendering: "pixelated",
                paddingBottom: `${(1 / aspectRatioAfterCrop) * 100}%`,
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
  marks: {
    code: ({ children }) => (
      <code className="bg-gray-700 p-1 rounded-md">{children}</code>
    ),
    link: ({ children, value }) => {
      const target = (value.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value.href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : undefined}
          className="text-pink-200 underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }) => {
      // console.log(children);
      if (
        Array.isArray(children) &&
        children.length === 1 &&
        children.join("") === ""
      ) {
        return <p className="pt-3">{children}</p>;
      } else {
        return <p>{children}</p>;
      }
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
    <Main images={images} className="max-w-4xl p-4">
      <h1 className="font-bold text-4xl my-6">{article.title}</h1>
      <div className={"space-y-2"}>
        <PortableText
          value={article.content}
          components={portableTextComponents}
        />
      </div>
    </Main>
  );
}

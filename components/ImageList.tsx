import { urlForImage } from "@/lib/sanity.image";
import { RandomImage } from "@/lib/sanity.query";
import ImageViewerOpener from "./ImageViewerOpener";

type Props = Omit<JSX.IntrinsicElements["ul"], "children"> & {
  images: RandomImage[];
  children: (props: {
    image: RandomImage;
    idx: number;
    previewElProps: PreviewElProps;
    imageElProps: ImageElProps;
  }) => React.ReactNode;
};

export type ImageListProps = Props;

type PreviewElProps = {
  style: React.CSSProperties;
};

type ImageElProps = {
  src: string;
  srcSet: string;
  sizes: string;
};

function getWidthFromBreakPoint(breakpoint: string) {
  switch (breakpoint) {
    case "sm":
      return 640;
    case "md":
      return 768;
    case "lg":
      return 1024;
    case "xl":
      return 1280;
    case "2xl":
      return 1536;
    default:
      return 0;
  }
}

export default function ImageList({
  images,
  children,
  className,
  ...rest
}: Props) {
  // inspired by: https://ericportis.com/posts/2014/separated/
  const sizes = className
    ?.split(/\s/)
    .map((item) => {
      return item.match(/(?<width>.*):grid-cols-(?<count>\d)/);
    })
    .map((match) => {
      if (match && match.groups) {
        const { groups } = match;
        return {
          width: getWidthFromBreakPoint(groups.width),
          count: Number(groups.count),
        };
      }
    })
    // The browser ignores everything after the first matching condition, so be careful how you order the media conditions.
    // ref: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
    // all undefined elements are sorted to the end of the array, with no call to compareFn
    .sort((a, b) => {
      if (a && b) {
        // media query with the largest width comes first.
        return b.width - a.width;
      }

      return 0;
    })
    .map((item) => {
      if (item) {
        return `(min-width: ${item.width}px) ${Math.floor(100 / item.count)}vw`;
      } else {
        return "";
      }
    })
    .filter(Boolean);

  return (
    <ul className={className} {...rest}>
      {images.map((image, idx) => {
        const previewElProps: PreviewElProps = {
          style: {
            backgroundImage: `url(${image.preview})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            imageRendering: "pixelated",
            // paddingBottom: `${(1 / image.aspectRatio) * 100}%`,
          },
        };

        const imageElProps: ImageElProps = {
          src: urlForImage(image.image).width(1024).url(),
          srcSet: [
            `${urlForImage(image.image).width(640).url()} 640w`,
            `${urlForImage(image.image).width(768).url()} 768w`,
            `${urlForImage(image.image).width(1024).url()} 1024w`,
            `${urlForImage(image.image).width(1280).url()} 1280w`,
            `${urlForImage(image.image).width(1536).url()} 1536w`,
            `${urlForImage(image.image).width(1920).url()} 1920w`,
            `${urlForImage(image.image).width(2560).url()} 2560w`,
            `${urlForImage(image.image).width(3840).url()} 3840w`,
          ].join(", "),
          sizes: Array.isArray(sizes)
            ? [...sizes, "100vw"].join(", ")
            : "100vw",
        };

        return (
          <ImageViewerOpener key={image.url} image={image}>
            {children({ image, idx, previewElProps, imageElProps })}
          </ImageViewerOpener>
        );
      })}
    </ul>
  );
}

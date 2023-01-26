import { urlForImage } from "@/lib/sanity.image";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";

type Props = {
  image: SanityImageObject;
  alt: string;
} & Omit<JSX.IntrinsicElements["img"], "src" | "srcset" | "alt">;

export default function Image({ image, alt, sizes, ...rest }: Props) {
  return (
    <img
      // src is for browsers that don't support srcset
      src={urlForImage(image).width(1024).url()}
      srcSet={[
        `${urlForImage(image).width(160).url()} 160w`,
        `${urlForImage(image).width(320).url()} 320w`,
        `${urlForImage(image).width(640).url()} 640w`,
        `${urlForImage(image).width(768).url()} 768w`,
        `${urlForImage(image).width(1024).url()} 1024w`,
        `${urlForImage(image).width(1280).url()} 1280w`,
        `${urlForImage(image).width(1536).url()} 1536w`,
        `${urlForImage(image).width(1920).url()} 1920w`,
        `${urlForImage(image).width(2560).url()} 2560w`,
        `${urlForImage(image).width(3840).url()} 3840w`,
      ].join(", ")}
      alt={alt}
      sizes={sizes ?? "100vw"}
      {...rest}
    />
  );
}

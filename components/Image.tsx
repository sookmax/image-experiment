import { urlForImage } from "@/lib/sanity.image";

type Props = {
  url: string;
  alt: string;
} & Omit<JSX.IntrinsicElements["img"], "src" | "srcset" | "alt">;

export default function Image({ url, alt, sizes, ...rest }: Props) {
  return (
    <img
      // src is for browsers that don't support srcset
      src={urlForImage(url).width(1024).url()}
      srcSet={[
        `${urlForImage(url).width(640).url()} 640w`,
        `${urlForImage(url).width(768).url()} 768w`,
        `${urlForImage(url).width(1024).url()} 1024w`,
        `${urlForImage(url).width(1280).url()} 1280w`,
        `${urlForImage(url).width(1536).url()} 1536w`,
        `${urlForImage(url).width(1920).url()} 1920w`,
        `${urlForImage(url).width(2560).url()} 2560w`,
        `${urlForImage(url).width(3840).url()} 3840w`,
      ].join(", ")}
      alt={alt}
      sizes={sizes ?? "100vw"}
      {...rest}
    />
  );
}

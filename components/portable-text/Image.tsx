import { getAspectRatioAfterCrop } from "@/lib/sanity.image";
import { RandomImage } from "@/lib/sanity.query";
import { PortableTextTypeComponentProps } from "@portabletext/react";
import _Image from "@/components/Image";
import ImageViewerOpener from "../image-viewer/ImageViewerOpener";
import { classNames } from "@/utils";

export default function Image({
  value,
}: PortableTextTypeComponentProps<RandomImage>) {
  const { preview, loading, imageObject, caption, url } = value;

  const aspectRatioAfterCrop = getAspectRatioAfterCrop(value);

  return (
    <ImageViewerOpener as="div" className={classNames("py-4")} imageUrl={url}>
      <figure>
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
          <_Image
            className="absolute inset-0 w-full h-full"
            image={imageObject}
            alt={caption}
            loading={loading}
            sizes="(min-width: 896px) 896px, 100vw"
          />
        </div>
        <figcaption className="text-sm text-gray-400 p-1">{caption}</figcaption>
      </figure>
    </ImageViewerOpener>
  );
}

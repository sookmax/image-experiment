import { urlForImage } from "@/lib/sanity.image";
import { classNames } from "@/utils";
import { useAppState } from "@/utils/store";
import React, { useEffect, useMemo, useState } from "react";
import Image from "../Image";

type Props = {
  children?: React.ReactNode;
};

export default function MainImage({ children }: Props) {
  const { images, currentImageIndex } = useAppState();

  const [rootContainer, setRootContainer] = useState<HTMLDivElement | null>();
  const [imageContainer, setImageContainer] = useState<HTMLDivElement | null>();
  const [captionContainer, setCaptionContainer] =
    useState<HTMLDivElement | null>();

  const currentImage = useMemo(
    () => images[currentImageIndex] ?? images[0],
    [images, currentImageIndex]
  );

  const aspectRatioAfterCrop = useMemo(() => {
    let aspect = currentImage.aspectRatio;

    const imageUrl = new URL(urlForImage(currentImage.image).url());

    if (imageUrl.searchParams.has("rect")) {
      const rect = imageUrl.searchParams.get("rect") as string;
      const [, , w, h] = rect.split(",").map((n) => parseInt(n, 10));
      aspect = w / h;
    }

    return aspect;
  }, [currentImage]);

  useEffect(() => {
    if (
      rootContainer &&
      imageContainer &&
      captionContainer &&
      aspectRatioAfterCrop
    ) {
      rootContainer.style.paddingBottom = `${
        captionContainer.getBoundingClientRect().height
      }px`;
      const { width, height } = rootContainer.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(rootContainer);
      const paddingTop = parseInt(
        computedStyle.getPropertyValue("padding-top").replace("px", ""),
        10
      );
      const paddingBottom = parseInt(
        computedStyle.getPropertyValue("padding-bottom").replace("px", ""),
        10
      );

      const containerAspectRatio =
        width / (height - paddingTop - paddingBottom);

      if (aspectRatioAfterCrop > containerAspectRatio) {
        imageContainer.style.width = "100%";
        imageContainer.style.height = "auto";
      } else {
        imageContainer.style.width = "auto";
        imageContainer.style.height = "100%";
      }
    }
  }, [rootContainer, imageContainer, captionContainer, aspectRatioAfterCrop]);

  return (
    <div
      className="flex-grow flex justify-center items-center relative pt-10"
      ref={setRootContainer}
    >
      <div
        className="relative"
        ref={setImageContainer}
        style={{
          backgroundImage: `url(${currentImage.preview})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          imageRendering: "pixelated",
          aspectRatio: aspectRatioAfterCrop,
        }}
      >
        <Image
          key={currentImage.url}
          className="absolute inset-0 w-full h-full"
          image={currentImage.image}
          alt={currentImage.caption}
        />
        <div
          ref={setCaptionContainer}
          className={classNames(
            "absolute top-full left-1/2 -translate-x-1/2 w-full",
            "py-3 px-2 sm:px-0"
          )}
        >
          <p className="line-clamp-5 sm:line-clamp-2">{currentImage.caption}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

"use client";

import { getAspectRatioAfterCrop } from "@/lib/sanity.image";
import { classNames } from "@/utils";
import { useAppState } from "@/utils/store";
import React, { useEffect, useMemo, useState } from "react";
import Image from "../Image";

type Props = {
  containerRect: { width: number; height: number } | null;
  children?: React.ReactNode;
};

export default function MainImage({ children, containerRect }: Props) {
  const { images, currentImageIndex } = useAppState();

  const [imageContainer, setImageContainer] = useState<HTMLDivElement | null>();
  const [captionContainer, setCaptionContainer] =
    useState<HTMLDivElement | null>();

  const currentImage = useMemo(
    () => images[currentImageIndex] ?? images[0],
    [images, currentImageIndex]
  );

  const aspectRatioAfterCrop = useMemo(
    () => getAspectRatioAfterCrop(currentImage),
    [currentImage]
  );

  useEffect(() => {
    if (
      containerRect &&
      imageContainer &&
      captionContainer &&
      aspectRatioAfterCrop
    ) {
      const imageHeight = containerRect.width / aspectRatioAfterCrop;
      const maxHeight = containerRect.height - captionContainer.offsetHeight;

      if (imageHeight > maxHeight) {
        imageContainer.style.width = "auto";
        imageContainer.style.height = "100%";
      } else {
        imageContainer.style.width = "100%";
        imageContainer.style.height = "auto";
      }

      captionContainer.style.maxWidth = window
        .getComputedStyle(imageContainer)
        .getPropertyValue("width");
    }
  }, [imageContainer, captionContainer, aspectRatioAfterCrop, containerRect]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
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
          image={currentImage.imageObject}
          alt={currentImage.caption}
        />
      </div>
      <div
        ref={setCaptionContainer}
        className={classNames("px-4 sm:px-0 pt-4")}
      >
        <p className="line-clamp-5 sm:line-clamp-2">{currentImage.caption}</p>
      </div>
      {children}
    </div>
  );
}

import { classNames } from "@/utils";
import { useAppDispatch, useAppState } from "@/utils/store";
import { useEffect, useState } from "react";
import Image from "../Image";

export default function ThumbnailList() {
  const { images, currentImageIndex } = useAppState();
  const dispatch = useAppDispatch();

  const [ulElement, setUlElement] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    if (ulElement) {
      const thumbnailItem = ulElement.children[currentImageIndex];

      if (thumbnailItem) {
        thumbnailItem.scrollIntoView({
          inline: "center",
          behavior: "smooth",
        });
      }
    }
  }, [currentImageIndex, ulElement]);

  return (
    <ul className="flex h-full space-x-2 overflow-auto" ref={setUlElement}>
      {images.map((image, index) => {
        const isActive = index === currentImageIndex;
        return (
          <li
            key={image.url}
            className={classNames(
              "flex-shrink-0 w-24",
              "cursor-pointer",
              isActive ? "border-2 border-white" : "border-2 border-transparent"
            )}
            onClick={() => {
              dispatch((state) => {
                state.currentImageIndex = index;
              });
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                backgroundImage: `url(${image.preview})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                imageRendering: "pixelated",
              }}
            >
              <Image
                className="absolute inset-0 w-full h-full object-cover"
                image={image.image}
                alt={image.caption}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

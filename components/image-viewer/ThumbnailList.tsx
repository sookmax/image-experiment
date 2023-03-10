"use client";
import { classNames } from "@/utils";
import { useAppDispatch, useAppState } from "@/utils/store";
import { useCallback, useEffect, useRef } from "react";
import Image from "../Image";

export default function ThumbnailList() {
  const { images, currentImageIndex } = useAppState();
  const dispatch = useAppDispatch();

  // Inspired by:
  // https://beta.reactjs.org/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback
  const itemsRef = useRef(new Map<number, HTMLLIElement>());

  const setRef = useCallback(
    (index: number) => (ref: HTMLLIElement | null) => {
      if (ref) {
        itemsRef.current.set(index, ref);
      } else {
        itemsRef.current.delete(index);
      }
    },
    []
  );

  useEffect(() => {
    const item = itemsRef.current.get(currentImageIndex);

    if (item) {
      item.scrollIntoView({
        inline: "center",
        behavior: "smooth",
      });
    }
  }, [currentImageIndex]);

  return (
    <ul className="flex h-full space-x-2 overflow-auto">
      {images.map((image, index) => {
        const isActive = index === currentImageIndex;
        return (
          <li
            key={image.url}
            ref={setRef(index)}
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
                image={image.imageObject}
                alt={image.caption}
                sizes="100px"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

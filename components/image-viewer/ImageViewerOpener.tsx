"use client";

import { useAppDispatch } from "@/utils/store";
import Slot from "@/components/Slot";
import { RandomImage } from "@/lib/sanity.query";

type Props = {
  imageOrIndex: number | RandomImage;
  as?: string;
  children?: React.ReactNode;
};

export default function ImageViewerOpener({
  imageOrIndex,
  as = "div",
  children,
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <Slot
      as={as}
      className="cursor-zoom-in"
      onClick={() =>
        dispatch((state) => {
          state.isViewerOpen = true;
          if (typeof imageOrIndex === "number") {
            state.currentImageIndex = imageOrIndex;
          } else {
            state.currentImageIndex = state.images.findIndex(
              (image) => image.url === imageOrIndex.url
            );
          }
        })
      }
    >
      {children}
    </Slot>
  );
}

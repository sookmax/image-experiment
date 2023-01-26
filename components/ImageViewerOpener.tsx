"use client";

import { RandomImage } from "@/lib/sanity.query";
import { useAppDispatch } from "@/utils/store";
import El from "./El";

type Props = JSX.IntrinsicElements["li"] & {
  imageIndex: number;
};

export default function ImageViewerOpener({ imageIndex, ...rest }: Props) {
  const dispatch = useAppDispatch();

  return (
    <El
      as="li"
      {...rest}
      onClick={() =>
        dispatch((state) => {
          state.isViewerOpen = true;
          state.currentImageIndex = imageIndex;
        })
      }
    />
  );
}

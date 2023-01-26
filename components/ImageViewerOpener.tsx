"use client";

import { RandomImage } from "@/lib/sanity.query";
import { useAppDispatch } from "@/utils/store";
import El from "./El";

type Props = JSX.IntrinsicElements["li"] & {
  image: RandomImage;
};

export default function ImageViewerOpener({ image, ...rest }: Props) {
  const dispatch = useAppDispatch();

  return (
    <El
      as="li"
      {...rest}
      onClick={() =>
        dispatch((state) => {
          state.isViewerOpen = true;
          state.viewerMainImage = image;
        })
      }
    />
  );
}

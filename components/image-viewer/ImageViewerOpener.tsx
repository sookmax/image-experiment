"use client";

import { useAppDispatch } from "@/utils/store";
import Slot from "@/components/Slot";

type Props = JSX.IntrinsicElements["li"] & {
  imageIndex: number;
};

export default function ImageViewerOpener({ imageIndex, ...rest }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Slot
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

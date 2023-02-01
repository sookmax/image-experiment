"use client";

import { classNames } from "@/utils";
import { useAppDispatch } from "@/utils/store";
import React, { useCallback } from "react";
import Slot, { SlotProps } from "../Slot";

type Props<TagName extends string> = {
  imageUrl: string;
} & Omit<SlotProps<TagName>, "onClick">;

export default function ImageViewerOpener<TagName extends string>({
  imageUrl,
  className,
  as,
  ...rest
}: Props<TagName>) {
  const dispatch = useAppDispatch();
  const onClick = useCallback(() => {
    dispatch((state) => {
      state.isViewerOpen = true;
      state.currentImageIndex = state.images.findIndex(
        (image) => image.url === imageUrl
      );
    });
  }, [dispatch, imageUrl]);

  return (
    <Slot
      as={as}
      className={classNames(className, "cursor-zoom-in")}
      onClick={onClick}
      {...rest}
    />
  );
}

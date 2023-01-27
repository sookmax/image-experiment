"use client";

import { RandomImage } from "@/lib/sanity.query";
import { AppContextProvider } from "@/utils/store";
import ImageViewer from "./image-viewer/ImageViewer";

type Props = JSX.IntrinsicElements["main"] & {
  images: RandomImage[];
};

export default function Main({ images, ...rest }: Props) {
  return (
    <AppContextProvider images={images}>
      <main {...rest} />
      <ImageViewer />
    </AppContextProvider>
  );
}

"use client";

import { AppContextProvider } from "@/utils/store";
import ImageViewer from "./ImageViewer";

type Props = JSX.IntrinsicElements["main"];

export default function Main(props: Props) {
  return (
    <AppContextProvider>
      <main {...props} />
      <ImageViewer />
    </AppContextProvider>
  );
}

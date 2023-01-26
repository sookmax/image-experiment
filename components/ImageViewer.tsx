"use client";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useAppDispatch, useAppState } from "@/utils/store";
import CloseIcon from "./icons/CloseIcon";
import { classNames } from "@/utils";
import { urlForImage } from "@/lib/sanity.image";
import { useEffect, useState } from "react";
import Image from "./Image";

export default function ImageViewer() {
  const { isViewerOpen, viewerMainImage } = useAppState();
  const dispatch = useAppDispatch();

  const [imageContainer, setImageContainer] = useState<HTMLDivElement | null>(
    null
  );
  const [previewEl, setPreviewEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (imageContainer && previewEl && viewerMainImage) {
      const { width, height } = imageContainer.getBoundingClientRect();
      const containerAspectRatio = width / height;

      if (viewerMainImage.aspectRatio > containerAspectRatio) {
        previewEl.style.width = "100%";
        previewEl.style.height = "auto";
      } else {
        previewEl.style.width = "auto";
        previewEl.style.height = "100%";
      }
    }
  }, [previewEl, imageContainer, viewerMainImage]);

  if (!viewerMainImage) return null;

  let correctedAspectRatio = viewerMainImage.aspectRatio;

  const imageUrl = new URL(urlForImage(viewerMainImage.image).url());

  if (imageUrl.searchParams.has("rect")) {
    const rect = imageUrl.searchParams.get("rect") as string;
    const [, , w, h] = rect.split(",").map((n) => parseInt(n, 10));
    correctedAspectRatio = w / h;
  }

  return (
    <Dialog.Root
      open={isViewerOpen}
      onOpenChange={(open) => {
        dispatch((state) => {
          state.isViewerOpen = open;
        });
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={classNames(
            "fixed inset-0 bg-black/80",
            "focus:outline-none focus-visible:outline-none"
          )}
        >
          <Dialog.Content className="w-full h-full focus-visible:outline-none">
            <VisuallyHidden.Root asChild>
              <Dialog.Title>Full-size Image Viewer</Dialog.Title>
            </VisuallyHidden.Root>
            <VisuallyHidden.Root asChild>
              <Dialog.Description>
                The image viewer shows you the original image with the correct
                aspect ratio
              </Dialog.Description>
            </VisuallyHidden.Root>
            <div className="flex flex-col text-white h-full">
              <div className="flex-shrink-0 flex items-center justify-end p-3">
                <Dialog.Close
                  className={classNames(
                    "w-8 h-8",
                    "rounded-md",
                    "focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-1",
                    "focus-visible:ring-offset-transparent"
                  )}
                >
                  <CloseIcon />
                </Dialog.Close>
              </div>
              <div
                className="flex-grow flex items-center justify-center"
                ref={setImageContainer}
              >
                <div
                  className="relative"
                  ref={setPreviewEl}
                  style={{
                    backgroundImage: `url(${viewerMainImage.preview})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    imageRendering: "pixelated",
                    aspectRatio: correctedAspectRatio,
                  }}
                >
                  <Image
                    className="absolute inset-0 w-full h-full"
                    image={viewerMainImage.image}
                    alt={viewerMainImage.caption}
                  />
                </div>
              </div>
              <div className="flex-shrink-0 h-32">Thumbnails</div>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

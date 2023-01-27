"use client";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useAppDispatch, useAppState } from "@/utils/store";
import CloseIcon from "./icons/CloseIcon";
import { classNames } from "@/utils";
import { urlForImage } from "@/lib/sanity.image";
import { useEffect, useState } from "react";
import Image from "./Image";
import ChevronRightIcon from "./icons/ChevronRightIcon";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";

export default function ImageViewer() {
  const { isViewerOpen, currentImageIndex, images } = useAppState();
  const dispatch = useAppDispatch();
  const currentImage = images[currentImageIndex] ?? images[0];

  const [imageContainer, setImageContainer] = useState<HTMLDivElement | null>(
    null
  );
  const [previewEl, setPreviewEl] = useState<HTMLDivElement | null>(null);
  const [thumbnailListEl, setThumbnailListEl] =
    useState<HTMLUListElement | null>(null);
  const [captionEl, setCaptionEl] = useState<HTMLDivElement | null>(null);

  let aspectRatioAfterCrop = currentImage.aspectRatio;

  const imageUrl = new URL(urlForImage(currentImage.image).url());

  if (imageUrl.searchParams.has("rect")) {
    const rect = imageUrl.searchParams.get("rect") as string;
    const [, , w, h] = rect.split(",").map((n) => parseInt(n, 10));
    aspectRatioAfterCrop = w / h;
  }

  useEffect(() => {
    if (imageContainer && previewEl && captionEl && aspectRatioAfterCrop) {
      imageContainer.style.paddingBottom = `${
        captionEl.getBoundingClientRect().height
      }px`;
      const { width, height } = imageContainer.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(imageContainer);
      const paddingTop = parseInt(
        computedStyle.getPropertyValue("padding-top").replace("px", ""),
        10
      );
      const paddingBottom = parseInt(
        computedStyle.getPropertyValue("padding-bottom").replace("px", ""),
        10
      );

      const containerAspectRatio =
        width / (height - paddingTop - paddingBottom);

      if (aspectRatioAfterCrop > containerAspectRatio) {
        previewEl.style.width = "100%";
        previewEl.style.height = "auto";
      } else {
        previewEl.style.width = "auto";
        previewEl.style.height = "100%";
      }
    }
  }, [previewEl, captionEl, imageContainer, aspectRatioAfterCrop]);

  useEffect(() => {
    if (thumbnailListEl) {
      const thumbnailItem = thumbnailListEl.children[currentImageIndex];

      if (thumbnailItem) {
        thumbnailItem.scrollIntoView({
          inline: "center",
          behavior: "smooth",
        });
      }
    }
  }, [currentImageIndex, thumbnailListEl]);

  if (!currentImage) return null;

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
            "fixed inset-0 bg-black/90",
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
            <div className="flex flex-col text-white h-full relative">
              <div className="absolute top-0 right-0 p-3 z-10">
                <Dialog.Close
                  className={classNames(
                    "w-8 h-8",
                    "rounded-md focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-offset-transparent"
                  )}
                >
                  <CloseIcon />
                </Dialog.Close>
              </div>
              <div
                className="flex-grow flex justify-center items-center relative pt-10"
                ref={setImageContainer}
              >
                <div
                  className="relative"
                  ref={setPreviewEl}
                  style={{
                    backgroundImage: `url(${currentImage.preview})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    imageRendering: "pixelated",
                    aspectRatio: aspectRatioAfterCrop,
                  }}
                >
                  <Image
                    key={currentImage.url}
                    className="absolute inset-0 w-full h-full"
                    image={currentImage.image}
                    alt={currentImage.caption}
                  />
                  <div
                    ref={setCaptionEl}
                    className={classNames(
                      "absolute top-full left-1/2 -translate-x-1/2 w-full",
                      "py-3 px-2 sm:px-0"
                    )}
                  >
                    <p className="line-clamp-5 sm:line-clamp-2">
                      {currentImage.caption}
                    </p>
                  </div>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 mx-2">
                  <button
                    className={classNames(
                      "w-10 h-10 text-white",
                      "rounded-md focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-offset-transparent"
                    )}
                    onClick={() => {
                      dispatch((state) => {
                        let nextImageIndex = state.currentImageIndex + 1;
                        if (nextImageIndex >= state.images.length) {
                          nextImageIndex = 0;
                        }
                        state.currentImageIndex = nextImageIndex;
                      });
                    }}
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 mx-2">
                  <button
                    className={classNames(
                      "w-10 h-10 text-white",
                      "rounded-md focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-offset-transparent"
                    )}
                    onClick={() => {
                      dispatch((state) => {
                        let nextImageIndex = state.currentImageIndex - 1;
                        if (nextImageIndex < 0) {
                          nextImageIndex = state.images.length - 1;
                        }
                        state.currentImageIndex = nextImageIndex;
                      });
                    }}
                  >
                    <ChevronLeftIcon />
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0 p-4 mb-3 sm:mb-0 h-24 mt-3">
                <ul
                  className="flex h-full space-x-2 overflow-auto"
                  ref={setThumbnailListEl}
                >
                  {images.map((image, index) => {
                    const isActive = index === currentImageIndex;
                    return (
                      <li
                        key={image.url}
                        className={classNames(
                          "flex-shrink-0 w-24",
                          "cursor-pointer",
                          isActive
                            ? "border-2 border-white"
                            : "border-2 border-transparent"
                        )}
                        onClick={() => {
                          dispatch((state) => {
                            state.currentImageIndex = index;
                          });
                        }}
                      >
                        <div
                          className="relative h-full"
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
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

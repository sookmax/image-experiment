"use client";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useAppDispatch, useAppState } from "@/utils/store";
import { classNames } from "@/utils";
import ThumbnailList from "./ThumbnailList";
import NextImageButton from "./NextImageButton";
import PrevImageButton from "./PrevImageButton";
import CloseButton from "./CloseButton";
import MainImageContainer from "./MainImageContainer";
import React, { useCallback, useEffect, useState } from "react";

export default function ImageViewer() {
  const { isViewerOpen } = useAppState();
  const dispatch = useAppDispatch();

  return <Memoized isOpen={isViewerOpen} dispatch={dispatch} />;
}

type Props = {
  isOpen: boolean;
  dispatch: ReturnType<typeof useAppDispatch>;
};

const Memoized = React.memo(function ImageViewerImpl({
  isOpen,
  dispatch,
}: Props) {
  const [mainImageBox, setMainImageBox] = useState<HTMLDivElement | null>(null);
  const [mainImageBoxRect, setMainImageBoxRect] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [thumbnailBox, setThumbnailbox] = useState<HTMLDivElement | null>(null);

  const onOpenChange = useCallback(
    (open: boolean) => {
      dispatch((state) => {
        state.isViewerOpen = open;
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (mainImageBox && thumbnailBox) {
      mainImageBox.style.height = `calc(100% - ${
        thumbnailBox.getBoundingClientRect().height
      }px)`;

      const computedStyle = window.getComputedStyle(mainImageBox);

      setMainImageBoxRect({
        width:
          parseFloat(
            computedStyle.getPropertyValue("width").replace("px", "")
          ) -
          parseFloat(
            computedStyle.getPropertyValue("padding-left").replace("px", "")
          ) -
          parseFloat(
            computedStyle.getPropertyValue("padding-right").replace("px", "")
          ),
        height:
          parseFloat(
            computedStyle.getPropertyValue("height").replace("px", "")
          ) -
          parseFloat(
            computedStyle.getPropertyValue("padding-top").replace("px", "")
          ) -
          parseFloat(
            computedStyle.getPropertyValue("padding-bottom").replace("px", "")
          ),
      });
    }
  }, [thumbnailBox, mainImageBox]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
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
            <div className="flex flex-col text-white h-full max-h-full relative">
              {/* Place the close button here so it gets the focus first when opened */}
              <div className="absolute top-0 right-0 p-3 z-10">
                <CloseButton />
              </div>
              {/* flex-grow was causing too many problems so I adopted a different solution */}
              <div
                ref={setMainImageBox}
                className="py-4 flex-grow-0 flex-shrink-0"
              >
                <MainImageContainer containerRect={mainImageBoxRect}>
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 mx-2">
                    <NextImageButton />
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 mx-2">
                    <PrevImageButton />
                  </div>
                </MainImageContainer>
              </div>
              <div
                ref={setThumbnailbox}
                className="flex-shrink-0 p-4 mb-3 sm:mb-0 h-24 mt-3"
              >
                <ThumbnailList />
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

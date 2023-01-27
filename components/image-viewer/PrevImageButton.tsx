import { classNames } from "@/utils";
import { useAppDispatch } from "@/utils/store";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";

export default function PrevImageButton() {
  const dispatch = useAppDispatch();

  return (
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
  );
}

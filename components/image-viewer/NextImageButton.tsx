import { classNames } from "@/utils";
import { useAppDispatch } from "@/utils/store";
import ChevronRightIcon from "../icons/ChevronRightIcon";

export default function NextImageButton() {
  const dispatch = useAppDispatch();

  return (
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
  );
}

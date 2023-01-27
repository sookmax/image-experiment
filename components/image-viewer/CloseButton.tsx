import { classNames } from "@/utils";
import { Close } from "@radix-ui/react-dialog";
import CloseIcon from "../icons/CloseIcon";

export default function CloseButton() {
  return (
    <Close
      className={classNames(
        "w-8 h-8",
        "rounded-md focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-offset-transparent"
      )}
    >
      <CloseIcon />
    </Close>
  );
}

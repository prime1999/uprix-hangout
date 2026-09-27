import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
  DialogViewport,
} from "@/components/ui/dialog";
import CheckOutForm from "./CheckOutForm";

type CallToActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: "default" | "hero";
};

const CallToAction = ({
  children = "Save your spot",
  variant = "default",
  className = "",
  ...props
}: CallToActionProps) => {
  const variantClasses =
    variant === "hero"
      ? "bg-blue-600 py-3 px-6 font-embrace text-xs shadow-lg shadow-blue-800 rounded-[24px] cursor-pointer duration-500 transition hover:bg-blue-700"
      : "rounded-full text-black font-semibold cursor-pointer duration-300 transition hover:bg-yellow-400 active:scale-95 shadow-md";

  return (
    <Dialog>
      <DialogTrigger {...props} className={`${variantClasses} ${className}`}>
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <DialogClose
              aria-label="Close checkout"
              className="absolute top-3 right-3 z-10"
            />
            <CheckOutForm embedded />
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
};

export default CallToAction;

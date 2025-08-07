import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { cn } from "../../lib/utils";
import { icons } from "../../assets/icons";

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string | React.ReactNode;
  className?: string;
}

function ModalLayout({
  children,
  isOpen,
  onClose,
  title,
  className,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogOverlay />  Why was this added again here when it's already in the dialog component and comes along with it?*/}
      <DialogContent
        className={cn(
          "p-0 gap-4 max-h-[90vh] overflow-auto dark:bg-white",
          className
        )}
      >
        <DialogTitle className="sr-only">Modal Component</DialogTitle>
        <DialogDescription className="sr-only">
          This is a modal component
        </DialogDescription>
        {title ? (
          <div className="sticky top-0 bg-inherit flex flex-col gap-4 pt-5 z-10">
            <div className="flex justify-between items-center px-5">
              <h1 className="text-dark font-medium text-lg">{title}</h1>
              <button className="w-6 h-6" onClick={onClose}>
                {React.cloneElement(icons.close2, {
                  fill: "black",
                })}
              </button>
            </div>
            <Separator />
          </div>
        ) : null}
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default ModalLayout;

import React, { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn } from "../../lib/utils";
import { icons } from "../../assets/icons";

export default function SideViewModalLayout({
  children,
  isOpen,
  onClose,
  title,
  className,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string | React.ReactNode;
  className?: string;
}) {
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const toggleWidth = () => {
    setFullWidth(!fullWidth);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className={cn(
          "p-[30px] rounded-l-xl lg:max-w-full space-y-6 overflow-auto",
          className,
          fullWidth ? "w-full rounded-l-none" : null
        )}
      >
        <div className="flex items-center justify-between border-b pb-2">
          <h1 className="text-gray-900 font-semibold text-xl">{title}</h1>
          <div className="flex items-center gap-5">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-md hover:ring-2 ring-inset ring-dark"
              onClick={toggleWidth}
            >
              {icons.expand}
            </button>
            <SheetClose
              asChild
              className="w-9 h-9 rounded-md flex items-center justify-center bg-danger_light"
            >
              <button>
                {" "}
                {React.cloneElement(icons.close2, { fill: "#F1416C" })}
              </button>
            </SheetClose>
          </div>
        </div>
        {children}
      </SheetContent>
    </Sheet>
  );
}

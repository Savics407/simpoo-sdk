import React from "react";
import { cn } from "../../lib/utils";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("border rounded-xl py-[30px] border-gray-200 ", className)}
    >
      {children}
    </div>
  );
}

export default Container;

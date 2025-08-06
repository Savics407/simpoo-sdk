import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../../lib/utils";

export interface DropDownOption {
  label: string | ReactNode;
  action?: () => void;
  disabled?: boolean;
}

function DropdownComponent({
  children,
  options,
  className,
  itemClass,
  align = "start",
  disabled,
}: {
  children: React.ReactNode;
  options: DropDownOption[];
  className?: string;

  itemClass?: string;
  align?: "start" | "center" | "end";
  disabled?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={cn(
          "flex flex-col gap-2 rounded-xl border-gray-200 py-3",
          className
        )}
      >
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            className={cn(
              `capitalize focus:bg-primary_light rounded-md focus:text-primary font-semibold text-gray-700 text-sm cursor-pointer px-[15px] flex items-center gap-[5px]`,
              itemClass
            )}
            onClick={option.action}
            disabled={option.disabled}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownComponent;

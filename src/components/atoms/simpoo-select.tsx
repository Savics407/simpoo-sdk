"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import InfoCard from "./InfoCard";

export interface IOption {
  label: string | ReactNode;
  value: string;
  searchId?: string;
  subOptions?: IOption[];
}

export const handleSearch = (options: IOption[], searchQuery: string) => {
  const searchData = options?.filter((option) => {
    if (typeof option.label === "string") {
      return option.label?.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return (
        option.value?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option?.searchId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });
  return searchQuery ? searchData : options;
};

export interface SelectProps {
  options?: IOption[];
  className?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  optional?: boolean;
  error?: string;
  showSearch?: boolean;
  icon?: ReactNode;
  showOutline?: boolean;
  info?: string;
  labelClass?: string;
  actionLabel?: string;
  actionLabelAction?: () => void;
  actionLabelInfo?: string;
  searchPlaceholder?: string;
  showMultiSelectValues?: boolean;
  disabled?: boolean;
  triggerClass?: string;
  loading?: boolean;
  showError?: boolean;
  onChangeSearch?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  searching?: boolean;
  infoAlignment?: "start" | "center" | "end";
  align?: "start" | "center" | "end";
  valueClass?: string;
}
const Select = ({
  label,
  options = [],
  className,
  placeholder,
  value = "",
  onValueChange,
  required,
  error,
  showSearch = true,
  showOutline = true,
  icon,
  info,
  optional,
  labelClass,
  actionLabel,
  actionLabelAction,
  actionLabelInfo,
  searchPlaceholder,
  disabled,
  triggerClass,
  loading,
  showError,
  onChangeSearch,
  searching,
  infoAlignment,
  align = "start",
  valueClass,
}: SelectProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [sourceWidth, setSourceWidth] = useState(0);
  const sourceRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (sourceRef.current) {
        setSourceWidth(sourceRef?.current?.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const findValueTitle = (value: string) => {
    const result = options?.find((option) => option.value === value);
    return result?.label;
  };
  return (
    <>
      {loading ? (
        <Skeleton className="w-full h-[48px]" />
      ) : (
        <div className={cn("flex flex-col gap-2.5", className)}>
          <div
            className={cn(
              "flex justify-between gap-2 flex-wrap",
              label ? null : "hidden"
            )}
          >
            {label && (
              <label
                className={cn(
                  "text-black flex items-center gap-1 first-letter:uppercase text-sm font-medium",
                  labelClass
                )}
              >
                <span className="first-letter:inherit">{label}</span>{" "}
                {required ? (
                  <span className="text-[#E12D39]">{label && "*"}</span>
                ) : optional ? (
                  <span className="text-[#B5B5B5] font-normal">(optional)</span>
                ) : null}
                {info && (
                  <InfoCard fieldName={label} align={infoAlignment}>
                    <p className="font-normal first-letter:uppercase">{info}</p>
                  </InfoCard>
                )}
              </label>
            )}
            {actionLabel && (
              <button
                onClick={actionLabelAction}
                className="text-primary flex items-center gap-1 first-letter:uppercase text-sm font-medium"
              >
                {actionLabel}
                {actionLabelInfo && (
                  <InfoCard fieldName={actionLabel}>
                    <p className="font-normal first-letter:uppercase text-left">
                      {actionLabelInfo}
                    </p>
                  </InfoCard>
                )}
              </button>
            )}
          </div>
          <Popover modal={true} open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                ref={sourceRef}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  `w-full h-[48px] justify-between border focus:border-primary border-neutral-200 bg-white hover:bg-white hover:border-[#BFD7FE] ${
                    (error || showError) && "!border-danger"
                  }`,
                  triggerClass
                )}
                disabled={disabled}
              >
                <span
                  className={cn(
                    "flex gap-2 first-letter:uppercase capitalize text-[#5E6278] justify-start truncate",
                    value ? "text-dark" : null,
                    valueClass
                  )}
                >
                  {value ? findValueTitle(value) : placeholder ?? "Select..."}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              style={{ width: sourceWidth }}
              className="min-w-[280px] p-0 bg-white rounded-xl border-gray-200"
              align={align}
            >
              <Command className="w-full">
                {showSearch && (
                  <CommandInput
                    onChangeCapture={onChangeSearch}
                    className="placeholder:text-xs"
                    placeholder={searchPlaceholder ?? "Search..."}
                  />
                )}
                {searching ? (
                  <div className="flex flex-col gap-2 p-2">
                    {[1, 2, 3].map((_, index) => (
                      <Skeleton key={index} className="h-9 rounded-md" />
                    ))}
                  </div>
                ) : (
                  <CommandEmpty>No result found.</CommandEmpty>
                )}

                <CommandGroup>
                  <CommandList className="">
                    {options?.map((option) => (
                      <CommandItem
                        key={`${
                          typeof option.label === "string"
                            ? option.label
                            : option?.searchId
                        }${option.value}`}
                        value={
                          typeof option.label === "string"
                            ? option.label
                            : option?.searchId
                        }
                        className={`first-letter:uppercase capitalize mb-1 hover:bg-primary_light w-full rounded-md  hover:text-primary font-semibold text-gray-700 text-sm cursor-pointer ${
                          value === option.value &&
                          "bg-primary_light text-primary"
                        }`}
                        onSelect={() => {
                          if (onValueChange) onValueChange(option.value);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {error && <p className="text-danger text-xs font-normal">{error}</p>}
        </div>
      )}
    </>
  );
};

export default Select;

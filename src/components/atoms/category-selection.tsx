"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { SelectProps } from "./simpoo-select";
import InfoCard from "./InfoCard";

interface MultiSelectProps extends SelectProps {
  onChange: (selectedValues: string[]) => void;
  values: string[];
  showCheckMark?: boolean;
  removeSelectedValue?: string;
  removeTag?: boolean;
  showCount?: boolean;
}
export function CategorySelector({
  placeholder,
  searchPlaceholder,
  options = [],
  showMultiSelectValues = true,
  values,
  onChange,
  className,
  showCheckMark = true,
  label,
  labelClass,
  required,
  info,
  optional,
  actionLabel,
  actionLabelAction,
  actionLabelInfo,
  removeSelectedValue,
  removeTag,
  loading,
  showCount,
  error,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [sourceWidth, setSourceWidth] = React.useState(0);
  const sourceRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateWidth = () => {
      if (sourceRef.current) {
        setSourceWidth(sourceRef?.current?.offsetWidth);
        // console.log(sourceRef?.current?.offsetWidth, "source width");
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [sourceRef]);

  const handleSetValue = (val: string) => {
    const newValue = values?.includes(val)
      ? values?.filter((item) => item !== val)
      : [...(values || []), val];
    if (onChange) onChange(newValue); // Trigger onChange callback
  };

  React.useEffect(() => {
    removeSelectedValue && handleSetValue(removeSelectedValue);
  }, [removeSelectedValue]);

  const [parentUUID, setParentUUID] = React.useState<string | null>(null);
  const toggleSubCategories = (uuid: string) => {
    setParentUUID((prev) => (prev === uuid ? null : uuid));
  };

  const getSelectedLabel = (uuid: string) => {
    for (let parent of options) {
      // check if it's a parent label
      if (parent.value === uuid) {
        return parent.label;
      }

      // check if it's a sub-option label

      if (parent.subOptions) {
        const foundSubOption = parent.subOptions.find(
          (sub) => sub.value === uuid
        );
        if (foundSubOption) {
          return foundSubOption.label;
        }
      }
    }
    return null;
  };

  return (
    <div ref={sourceRef}>
      {loading ? (
        <Skeleton className="w-full h-[48px]" />
      ) : (
        <div className={cn("flex flex-col gap-2.5", className)}>
          <div className="flex justify-between gap-2 flex-wrap">
            {label && (
              <label
                className={cn(
                  "text-black flex items-center gap-1 first-letter:uppercase text-sm font-medium",
                  labelClass
                )}
              >
                {label}{" "}
                {required ? (
                  <span className="text-[#E12D39]">{label && "*"}</span>
                ) : optional ? (
                  <span className="text-[#B5B5B5] font-normal">(optional)</span>
                ) : null}
                {info && (
                  <InfoCard fieldName={label}>
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
                  <InfoCard fieldName={label}>
                    <p className="font-normal first-letter:uppercase">
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
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  `w-full h-[48px] justify-between border focus:border-primary border-neutral-200 bg-white hover:bg-white hover:border-[#BFD7FE] ${
                    error && "!border-danger"
                  }`,
                  showMultiSelectValues ? "h-auto py-3" : null,
                  className
                )}
              >
                <div className="flex gap-2 text-[#5E6278] justify-start first-letter:uppercase flex-wrap">
                  {values?.length && showMultiSelectValues
                    ? values.map((val, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            removeTag ? null : handleSetValue(val),
                              toggleSubCategories(val);
                          }}
                          className="px-2 py-1  text-black flex items-center justify-between rounded gap-2 border bg-slate-200 text-xs font-medium"
                        >
                          {/* {options?.find((option) => option.value === val)?.label} */}
                          <span className="flex justify-start text-start flex-wrap gap-2 whitespace-normal">
                            {getSelectedLabel(val)}
                          </span>
                          <span className="">
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 9 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.44001 4.49978L7.83334 2.12644C7.96064 1.99737 8.03146 1.82301 8.03021 1.64173C8.02896 1.46044 7.95575 1.28708 7.82667 1.15978C7.6976 1.03247 7.52324 0.961657 7.34196 0.962907C7.16067 0.964157 6.98731 1.03737 6.86001 1.16644L4.50001 3.55978L2.14001 1.21311C2.0151 1.08894 1.84613 1.01925 1.67001 1.01925C1.49388 1.01925 1.32492 1.08894 1.20001 1.21311C1.13752 1.27509 1.08793 1.34882 1.05408 1.43006C1.02023 1.5113 1.00281 1.59844 1.00281 1.68644C1.00281 1.77445 1.02023 1.86159 1.05408 1.94283C1.08793 2.02407 1.13752 2.0978 1.20001 2.15978L3.56001 4.49978L1.16667 6.87311C1.03937 7.00218 0.968554 7.17654 0.969804 7.35782C0.971054 7.53911 1.04427 7.71247 1.17334 7.83978C1.30241 7.96708 1.47677 8.0379 1.65805 8.03665C1.83934 8.0354 2.0127 7.96218 2.14001 7.83311L4.50001 5.43978L6.86001 7.78644C6.98492 7.91061 7.15388 7.98031 7.33001 7.98031C7.50613 7.98031 7.6751 7.91061 7.80001 7.78644C7.86249 7.72447 7.91209 7.65073 7.94594 7.56949C7.97978 7.48826 7.99721 7.40112 7.99721 7.31311C7.99721 7.2251 7.97978 7.13797 7.94594 7.05673C7.91209 6.97549 7.86249 6.90175 7.80001 6.83978L5.44001 4.49978Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </div>
                      ))
                    : !showMultiSelectValues && showCount && values.length > 0
                    ? `${values.length} ${label} selected`
                    : placeholder ?? "Select..."}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              style={{ width: sourceWidth }}
              className="w-[480px] p-0 bg-white rounded-xl border-gray-200"
            >
              <Command>
                <CommandInput
                  className="placeholder:text-xs"
                  placeholder={searchPlaceholder ?? "Search..."}
                />
                <CommandEmpty>No result found.</CommandEmpty>
                <CommandGroup>
                  <CommandList className="">
                    {options?.map((option, index) => (
                      <div key={index}>
                        <CommandItem
                          //   key={option.value}
                          value={
                            typeof option.label === "string"
                              ? option.label
                              : option.searchId
                          }
                          className={`first-letter:uppercase mb-1 focus:bg-primary_light w-full rounded-md focus:text-primary hover:text-primary font-semibold text-gray-700 text-sm cursor-pointer ${
                            values?.includes(option.value) &&
                            "bg-primary_light text-primary"
                          }`}
                          onSelect={() => {
                            handleSetValue(option.value);
                            option?.subOptions &&
                              option?.subOptions?.length > 0 &&
                              toggleSubCategories(option.value);
                          }}
                        >
                          {showCheckMark && (
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                values?.includes(option.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          )}
                          <p className="flex justify-between w-full">
                            {option.label}
                            {option?.subOptions &&
                              option?.subOptions?.length > 0 && (
                                <ChevronDown className="ml-2 h-5 w-5 font-bold shrink-0 opacity-50" />
                              )}
                          </p>
                        </CommandItem>

                        {parentUUID === option.value &&
                          option?.subOptions &&
                          option?.subOptions?.map((sub, index) => (
                            <CommandItem
                              key={index}
                              value={
                                typeof sub.label === "string"
                                  ? sub.label
                                  : sub.searchId
                              }
                              className={`first-letter:uppercase mb-1 focus:bg-primary_light w-full rounded-md focus:text-primary hover:text-primary font-semibold text-gray-700 text-sm cursor-pointer pl-6 ${
                                values?.includes(sub.value) &&
                                "bg-primary_light text-primary"
                              }`}
                              onSelect={() => {
                                handleSetValue(sub.value);
                              }}
                            >
                              {showCheckMark && (
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    values?.includes(sub.value)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              )}
                              {sub.label}
                            </CommandItem>
                          ))}
                      </div>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {error && <p className="text-danger text-xs font-normal">{error}</p>}
        </div>
      )}
    </div>
  );
}

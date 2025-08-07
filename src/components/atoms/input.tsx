"use client";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Skeleton } from "../ui/skeleton";
import { handleSearch } from "./simpoo-select";
import { cn } from "../../lib/utils";
import InfoCard from "./InfoCard";
import { icons } from "../../assets/icons";

export default function Input({
  label,
  addonLabel,
  type,
  placeholder,
  selectPlaceholder,
  error,
  success,
  value,
  defaultValue,
  name,
  id,
  formik,
  onChange,
  inputRef,
  onBlur,
  required,
  disabled,
  loading,
  showError,
  selectOptions,
  disableSearch,
  searchSelectPlaceholder,
  showSelectSearch,
  onSelectValueChange,
  selectValue,
  showOutline = true,
  cols,
  rows,
  labelClass,
  addonLabelClass,
  optional,
  info,
  addonInfo,
  icon,
  actionIcon,
  actionLabel,
  actionLabelInfo,
  actionLabelAction,
  className,
  textAreaOnChange,
  addOn,
  infoAlignment,
  addonInfoAlignment,
  inputContainerClass,
  showNegative,
  showPositive,
  ...props
}: IInput) {
  const [inputType, setInputType] = useState(type);
  const [focus, setFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const togglePassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const searchData = handleSearch(selectOptions ?? [], searchValue);

  return (
    <>
      {loading ? (
        <Skeleton className="w-full h-[48px]" />
      ) : (
        <div className="w-full">
          <div className={`flex flex-col ${label && "gap-2.5"} relative  `}>
            <div className="flex justify-between gap-2 flex-wrap">
              {/* addon label */}
              {addonLabel && (
                <label
                  className={cn(
                    `text-black flex items-center gap-1 first-letter:uppercase text-sm font-medium`,
                    addonLabelClass
                  )}
                >
                  {addonLabel}{" "}
                  {required ? (
                    <span className="text-[#E12D39]">{addonLabel && "*"}</span>
                  ) : optional ? (
                    <span className="text-[#B5B5B5] font-normal">
                      (optional)
                    </span>
                  ) : null}
                  {addonInfo && (
                    <InfoCard fieldName={addonLabel} align={addonInfoAlignment}>
                      <p className="font-normal first-letter:uppercase">
                        {addonInfo}
                      </p>
                    </InfoCard>
                  )}
                </label>
              )}
              {label && (
                <label
                  className={cn(
                    `text-black flex items-center gap-1 first-letter:uppercase text-sm font-medium`,
                    labelClass
                  )}
                >
                  {label}{" "}
                  {required ? (
                    <span className="text-[#E12D39]">{label && "*"}</span>
                  ) : optional ? (
                    <span className="text-[#B5B5B5] font-normal">
                      (optional)
                    </span>
                  ) : null}
                  {info && (
                    <InfoCard fieldName={label} align={infoAlignment}>
                      <p className="font-normal first-letter:uppercase w-full whitespace-pre-wrap">
                        {info}
                      </p>
                    </InfoCard>
                  )}
                </label>
              )}

              {actionLabel && (
                <button
                  onClick={actionLabelAction}
                  className="text-primary flex items-center gap-1 first-letter:uppercase text-sm font-bold"
                >
                  {actionIcon}
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
            <div
              className={cn(
                `border overflow-hidden  rounded-md text-sm border-[#E1E3EA] hover:border-primary_light font-normal text-grey-950 flex gap-2 items-center bg-white px-3 ${
                  type !== "text-area" && "h-[48px]"
                } ${(error || showError) && "!border-danger"} ${
                  success && "!border-success"
                } ${focus && showOutline && "!border-primary"}
             ${icon && "px-2"}
             ${addOn && "px-0"}
          `,

                disabled ? "cursor-not-allowed bg-gray-200" : null,
                selectOptions ? "px-0" : null,
                inputContainerClass
              )}
            >
              {addOn && (
                <span className="bg-gray-200 text-[13px] font-semibold text-gray-700 h-full min-w-[38px] flex items-center justify-center shrink-0 rounded-l-[6px] px-2 ">
                  {addOn}
                </span>
              )}
              {icon}
              {selectOptions && (
                <Select
                  onValueChange={onSelectValueChange}
                  defaultValue={selectValue}
                  value={selectValue}
                >
                  <SelectTrigger
                    disabled={disableSearch}
                    className=" min-w-max w-max h-full border-0 border-r rounded-none hover:border-neutral-200 focus:border-neutral-200 bg-[#F9F9F9]  hover:border-b-neutral-200 disabled:opacity-100 "
                  >
                    <SelectValue
                      className=" text-sm text-[#5E6278] placeholder:font-medium outline-none"
                      placeholder={selectPlaceholder}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white w-full relative">
                    {showSelectSearch && (
                      <input
                        value={searchValue}
                        onChange={(e) => {
                          setSearchValue(e.target.value.toString());
                        }}
                        placeholder={searchSelectPlaceholder ?? "Search..."}
                        className="h-10 border mb-2 text-sm px-4 outline-none w-full border-neutral-200 rounded bg-white sticky top-0 z-20"
                      />
                    )}
                    {searchData?.map((option, i) => (
                      <SelectItem
                        key={option.value}
                        className="text-sm"
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {type === "text-area" ? (
                <textarea
                  cols={cols}
                  rows={rows}
                  onFocus={() => setFocus(true)}
                  onBlur={(e) => {
                    setFocus(false);
                  }}
                  placeholder={placeholder}
                  className={cn(
                    `placeholder:text-[#7E8299] hover:border-primary_light py-2 h-full placeholder:font-medium outline-none w-full rounded ${
                      disabled ? "bg-[#EEEFF2] cursor-not-allowed" : null
                    } ${
                      focus && showOutline && "!border-primary"
                    } transition-all ease-in-out`,
                    className
                  )}
                  {...props}
                  value={value}
                  name={name}
                  onChange={textAreaOnChange}
                />
              ) : (
                <input
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const input = e.target as HTMLInputElement;

                    if (type === "number") {
                      input.value = input.value.replace(/[^0-9.]/g, "");
                      // Ensure there's only one decimal point
                      input.value = input.value.replace(/^\.|(\..*)\./g, "$1");
                      if (
                        input.value.length > 1 &&
                        input.value.startsWith("0") &&
                        input.value[1] !== "."
                      ) {
                        input.value = input.value.replace(/^0+/, "");
                      }
                      if (input.value === "" || input.value === "0") {
                        input.value = "0";
                      }

                      // // Prevent leading decimal point (e.g., ".45" → "0.45")
                      // if (input.value.startsWith(".")) {
                      //   input.value = "0" + input.value;
                      // }
                    }
                  }}
                  type={inputType === "number" ? "text" : inputType}
                  placeholder={placeholder}
                  className={cn(
                    `placeholder:text-[#7E8299] h-full placeholder:font-medium outline-none w-full rounded disabled:cursor-not-allowed`,
                    selectOptions && type === "number" ? "pr-2" : null,
                    icon || addOn ? "pr-0" : null,
                    selectOptions &&
                      type === "number" &&
                      addonLabel &&
                      "text-right pr-2",
                    className,
                    showPositive && value?.toString().trim() !== "0"
                      ? "text-green-600 font-semibold"
                      : "",
                    showNegative && value?.toString().trim().startsWith("-")
                      ? "text-red-600 font-semibold"
                      : ""
                  )}
                  onFocus={() => setFocus(true)}
                  onBlur={(e) => {
                    if (formik && onBlur) {
                      formik && onBlur(e);
                    }
                    setFocus(false);
                  }}
                  value={value || ""}
                  defaultValue={defaultValue}
                  onChange={onChange}
                  id={id}
                  name={name}
                  required={required}
                  disabled={disabled}
                  ref={inputRef}
                  {...props}
                />
              )}
              {type === "password" && (
                <span className="cursor-pointer" onClick={togglePassword}>
                  {inputType === "password" ? icons.eyeslash : icons.eye}
                </span>
              )}
            </div>
            {error && (
              <p className="text-danger text-xs font-normal">{error}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

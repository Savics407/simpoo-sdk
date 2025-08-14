"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import InfoCard from "./InfoCard";
export const handleSearch = (options, searchQuery) => {
    const searchData = options?.filter((option) => {
        if (typeof option.label === "string") {
            return option.label?.toLowerCase().includes(searchQuery.toLowerCase());
        }
        else {
            return (option.value?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                option?.searchId?.toLowerCase().includes(searchQuery.toLowerCase()));
        }
    });
    return searchQuery ? searchData : options;
};
const Select = ({ label, options = [], className, placeholder, value = "", onValueChange, required, error, showSearch = true, showOutline = true, icon, info, optional, labelClass, actionLabel, actionLabelAction, actionLabelInfo, searchPlaceholder, disabled, triggerClass, loading, showError, onChangeSearch, searching, infoAlignment, align = "start", valueClass, }) => {
    const [searchValue, setSearchValue] = useState("");
    const [open, setOpen] = useState(false);
    const [sourceWidth, setSourceWidth] = useState(0);
    const sourceRef = useRef(null);
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
    const findValueTitle = (value) => {
        const result = options?.find((option) => option.value === value);
        return result?.label;
    };
    return (_jsx(_Fragment, { children: loading ? (_jsx(Skeleton, { className: "w-full h-[48px]" })) : (_jsxs("div", { className: cn("flex flex-col gap-2.5", className), children: [_jsxs("div", { className: cn("flex justify-between gap-2 flex-wrap", label ? null : "hidden"), children: [label && (_jsxs("label", { className: cn("text-black flex items-center gap-1 first-letter:uppercase text-sm font-medium", labelClass), children: [_jsx("span", { className: "first-letter:inherit", children: label }), " ", required ? (_jsx("span", { className: "text-[#E12D39]", children: label && "*" })) : optional ? (_jsx("span", { className: "text-[#B5B5B5] font-normal", children: "(optional)" })) : null, info && (_jsx(InfoCard, { fieldName: label, align: infoAlignment, children: _jsx("p", { className: "font-normal first-letter:uppercase", children: info }) }))] })), actionLabel && (_jsxs("button", { onClick: actionLabelAction, className: "text-primary flex items-center gap-1 first-letter:uppercase text-sm font-medium", children: [actionLabel, actionLabelInfo && (_jsx(InfoCard, { fieldName: actionLabel, children: _jsx("p", { className: "font-normal first-letter:uppercase text-left", children: actionLabelInfo }) }))] }))] }), _jsxs(Popover, { modal: true, open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { ref: sourceRef, variant: "outline", role: "combobox", "aria-expanded": open, className: cn(`w-full h-[48px] justify-between border focus:border-primary border-neutral-200 bg-white hover:bg-white hover:border-[#BFD7FE] ${(error || showError) && "!border-danger"}`, triggerClass), disabled: disabled, children: [_jsx("span", { className: cn("flex gap-2 first-letter:uppercase capitalize text-[#5E6278] justify-start truncate", value ? "text-dark" : null, valueClass), children: value ? findValueTitle(value) : placeholder ?? "Select..." }), _jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })] }) }), _jsx(PopoverContent, { style: { width: sourceWidth }, className: "min-w-[280px] p-0 bg-white rounded-xl border-gray-200", align: align, children: _jsxs(Command, { className: "w-full", children: [showSearch && (_jsx(CommandInput, { onChangeCapture: onChangeSearch, className: "placeholder:text-xs", placeholder: searchPlaceholder ?? "Search..." })), searching ? (_jsx("div", { className: "flex flex-col gap-2 p-2", children: [1, 2, 3].map((_, index) => (_jsx(Skeleton, { className: "h-9 rounded-md" }, index))) })) : (_jsx(CommandEmpty, { children: "No result found." })), _jsx(CommandGroup, { children: _jsx(CommandList, { className: "", children: options?.map((option) => (_jsxs(CommandItem, { value: typeof option.label === "string"
                                                    ? option.label
                                                    : option?.searchId, className: `first-letter:uppercase capitalize mb-1 hover:bg-primary_light w-full rounded-md  hover:text-primary font-semibold text-gray-700 text-sm cursor-pointer ${value === option.value &&
                                                    "bg-primary_light text-primary"}`, onSelect: () => {
                                                    if (onValueChange)
                                                        onValueChange(option.value);
                                                    setOpen(false);
                                                }, children: [_jsx(Check, { className: cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0") }), option.label] }, `${typeof option.label === "string"
                                                ? option.label
                                                : option?.searchId}${option.value}`))) }) })] }) })] }), error && _jsx("p", { className: "text-danger text-xs font-normal", children: error })] })) }));
};
export default Select;
//# sourceMappingURL=simpoo-select.js.map
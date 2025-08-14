"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Input from "./input";
import { PopoverClose } from "@radix-ui/react-popover";
import Button from "./button";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { usePostData } from "../../api/queryHooks";
import { addCommasToNumber, formatToCurrency, } from "../../store/actions/utility";
function InlineUpdate({ value, label, placeholder, uuid, name, displayValue, valueType, item_unit, }) {
    const { mutate, isPending } = usePostData();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [itemPayload, setItemPayload] = useState({
        item_uuid: uuid,
        [name]: value,
    });
    const queryClient = useQueryClient();
    const updateItem = () => {
        mutate({ url: "/outbound/items/update_basic", payload: itemPayload }, {
            onSuccess: () => {
                // queryClient.invalidateQueries({ queryKey: ["items"] });
                // dispatch(triggerUpdate());
                setPlaceValue(itemPayload[name]);
                setIsOpen(false);
            },
            onError: () => {
                setPlaceValue("");
            },
        });
    };
    const [placeValue, setPlaceValue] = useState("");
    return (_jsxs(Popover, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(PopoverTrigger, { className: "flex items-center", children: _jsx("button", { className: "hover:text-primary  duration-150 underline disabled:no-underline disabled:hover:text-inherit", children: placeValue
                        ? name === "selling_price"
                            ? formatToCurrency(+placeValue)
                            : addCommasToNumber(+placeValue) + item_unit
                        : displayValue }) }), _jsxs(PopoverContent, { align: "center", className: "shadow-[0_1px_2px_0px_#E4E5E73D,_0_12px_24px_0_#868C981F] space-y-2 bg-white rounded-xl p-3 w-[280px] relative before:absolute before:w-3 before:h-1.5 before:bg-white before:left-1/2 before:-translate-x-1/2 before:rotate-45 data-[side=bottom]:before:top-0 data-[side=top]:before:bottom-0", children: [_jsx(Input, { type: valueType, value: itemPayload[name], label: label, placeholder: placeholder, onChange: (e) => {
                            setItemPayload((prev) => ({ ...prev, [name]: e.target.value }));
                        } }), _jsxs("div", { className: "flex justify-end gap-2.5", children: [_jsx(PopoverClose, { children: _jsx(Button, { label: "Dismiss", className: "bg-gray-300 text-dark text-sm hover:bg-gray-300/90 font-medium", disabled: isPending }) }), _jsx(Button, { label: "Update", className: "text-sm font-medium", onClick: updateItem, loading: isPending })] })] })] }));
}
export default InlineUpdate;
//# sourceMappingURL=inline-update.js.map
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ModalLayout from "../../layouts/modal-layout";
import { Separator } from "../../ui/separator";
import Button from "../../atoms/button";
import { useQueryClient } from "@tanstack/react-query";
import { usePostData } from "../../../api/queryHooks";
import { icons } from "../../../assets/icons";
function DeleteItem({ isOpen, onClose, uuids, single = false, }) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = usePostData();
    const deleteItem = () => {
        mutate({
            url: "/outbound/items/delete",
            payload: {
                item_uuids: uuids,
            },
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["items"] });
                queryClient.invalidateQueries({ queryKey: ["items-tab"] });
                onClose();
            },
        });
    };
    return (_jsxs(ModalLayout, { isOpen: isOpen, onClose: onClose, className: "w-[440px] py-5", children: [_jsxs("div", { className: "px-5 flex gap-4", children: [_jsx("span", { className: "shrink-0 w-10 h-10 flex items-center justify-center rounded-[10px] bg-red_light", children: React.cloneElement(icons.error, {
                            fill: "#DF1C41",
                        }) }), _jsxs("div", { className: "space-y-1", children: [_jsxs("h1", { className: "text-[#0A0D14] font-semibold capitalize", children: ["delete ", single ? "item" : "items"] }), _jsxs("p", { className: "text-[#525866] text-sm font-normal", children: ["Are you sure you want to delete", " ", single ? "this item" : "these items", "? Some sales data will be lost if you delete ", single ? "this item" : "these items", "."] })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "grid grid-cols-2 gap-2.5 px-5", children: [_jsx(Button, { label: "Dismiss", className: "bg-[#F1F1F2] text-[#181C32] hover:bg-[#F1F1F2]/90", onClick: onClose, disabled: isPending }), _jsx(Button, { label: "Delete", className: "bg-danger hover:bg-danger/90", onClick: deleteItem, loading: isPending })] })] }));
}
export default DeleteItem;
//# sourceMappingURL=delete-item.js.map
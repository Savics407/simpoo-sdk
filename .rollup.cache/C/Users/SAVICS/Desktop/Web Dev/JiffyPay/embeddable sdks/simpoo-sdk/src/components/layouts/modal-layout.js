import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { cn } from "../../lib/utils";
import { icons } from "../../assets/icons";
function ModalLayout({ children, isOpen, onClose, title, className, }) {
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: cn("p-0 gap-4 max-h-[90vh] overflow-auto", className), children: [_jsx(DialogTitle, { className: "sr-only", children: "Modal Component" }), _jsx(DialogDescription, { className: "sr-only", children: "This is a modal component" }), title ? (_jsxs("div", { className: "sticky top-0 bg-inherit flex flex-col gap-4 pt-5 z-10", children: [_jsxs("div", { className: "flex justify-between items-center px-5", children: [_jsx("h1", { className: "text-dark font-medium text-lg", children: title }), _jsx("button", { className: "w-6 h-6", onClick: onClose, children: React.cloneElement(icons.close2, {
                                        fill: "black",
                                    }) })] }), _jsx(Separator, {})] })) : null, children] }) }));
}
export default ModalLayout;
//# sourceMappingURL=modal-layout.js.map
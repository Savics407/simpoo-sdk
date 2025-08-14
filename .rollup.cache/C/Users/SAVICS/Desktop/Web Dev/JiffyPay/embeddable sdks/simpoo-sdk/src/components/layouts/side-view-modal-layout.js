import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Sheet, SheetClose, SheetContent } from "../ui/sheet";
import { cn } from "../../lib/utils";
import { icons } from "../../assets/icons";
export default function SideViewModalLayout({ children, isOpen, onClose, title, className, }) {
    const [fullWidth, setFullWidth] = useState(false);
    const toggleWidth = () => {
        setFullWidth(!fullWidth);
    };
    return (_jsx(Sheet, { open: isOpen, onOpenChange: onClose, children: _jsxs(SheetContent, { className: cn("p-[30px] rounded-l-xl lg:max-w-full space-y-6 overflow-auto", className, fullWidth ? "w-full rounded-l-none" : null), children: [_jsxs("div", { className: "flex items-center justify-between border-b pb-2", children: [_jsx("h1", { className: "text-gray-900 font-semibold text-xl", children: title }), _jsxs("div", { className: "flex items-center gap-5", children: [_jsx("button", { className: "w-9 h-9 flex items-center justify-center rounded-md hover:ring-2 ring-inset ring-dark", onClick: toggleWidth, children: icons.expand }), _jsx(SheetClose, { asChild: true, className: "w-9 h-9 rounded-md flex items-center justify-center bg-danger_light", children: _jsxs("button", { children: [" ", React.cloneElement(icons.close2, { fill: "#F1416C" })] }) })] })] }), children] }) }));
}
//# sourceMappingURL=side-view-modal-layout.js.map
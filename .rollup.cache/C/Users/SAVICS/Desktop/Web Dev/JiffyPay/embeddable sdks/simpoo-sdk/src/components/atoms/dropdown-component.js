import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../ui/dropdown-menu";
import { cn } from "../../lib/utils";
function DropdownComponent({ children, options, className, itemClass, align = "start", disabled, }) {
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { disabled: disabled, asChild: true, children: children }), _jsx(DropdownMenuContent, { align: align, className: cn("flex flex-col gap-2 rounded-xl border-gray-200 py-3", className), children: options.map((option, index) => (_jsx(DropdownMenuItem, { className: cn(`capitalize focus:bg-primary_light rounded-md focus:text-primary font-semibold text-gray-700 text-sm cursor-pointer px-[15px] flex items-center gap-[5px]`, itemClass), onClick: option.action, disabled: option.disabled, children: option.label }, index))) })] }));
}
export default DropdownComponent;
//# sourceMappingURL=dropdown-component.js.map
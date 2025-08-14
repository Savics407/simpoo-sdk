import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { icons } from "../../assets/icons";
import { cn } from "../../lib/utils";
function SearchComponent({ placeholder, className, inputClass, ...props }) {
    return (_jsxs("div", { className: cn(`h-12 border border-gray-300 rounded-md w-[320px] flex`, className), children: [_jsx("span", { className: "bg-gray-200 w-[38px] flex items-center justify-center shrink-0 rounded-l-[6px] ", children: icons.magnifier }), _jsx("input", { type: "search", placeholder: placeholder, className: "w-full px-3 text-dark text-sm font-medium bg-transparent outline-none rounded-r-[6px]", ...props })] }));
}
export default SearchComponent;
//# sourceMappingURL=search-component.js.map
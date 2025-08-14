"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
import { ThreeDots } from "react-loader-spinner";
function Button({ label, left_addon, right_addon, className, disabled, loading, mode = "contained", onClick, type, loaderColor = "#fff", ...props }) {
    return (_jsx("button", { onClick: onClick, className: cn(`${mode === "contained"
            ? "bg-primary hover:bg-button h-[38px] px-3 text-white"
            : "text-primary hover:text-button bg-transparent"} flex gap-[5px] transition ease-in items-center justify-center font-semibold cursor-pointer text-[13px] rounded-md disabled:opacity-70 disabled:cursor-not-allowed`, className), disabled: disabled ?? loading, type: type, ...props, children: loading ? (_jsx(ThreeDots, { visible: true, height: "40", width: "40", color: loaderColor, radius: "9", ariaLabel: "three-dots-loading" })) : (_jsxs(_Fragment, { children: [left_addon, _jsx("span", { className: "first-letter:uppercase", children: label }), right_addon] })) }));
}
export default Button;
//# sourceMappingURL=button.js.map
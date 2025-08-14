import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ItemEmpty({ props = {} }) {
    return (_jsxs("div", { className: "flex flex-col gap-3 items-center py-24", children: [_jsx("p", { className: "font-bold text-sm", children: props.header ?? "No item attached" }), _jsx("p", { className: "font-bold text-[13px] text-gray-700", children: props.subText ?? "Add a new item to start managing your orders." })] }));
}
export default ItemEmpty;
//# sourceMappingURL=ItemEmpty.js.map
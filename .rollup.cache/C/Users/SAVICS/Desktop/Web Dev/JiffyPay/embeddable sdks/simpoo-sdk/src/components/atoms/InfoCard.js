import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../ui/hover-card";
import { icons } from "../../assets/icons";
function InfoCard({ children, trigger, fieldName, align = "start", }) {
    return (_jsxs(HoverCard, { children: [_jsx(HoverCardTrigger, { className: "cursor-pointer", children: trigger ?? icons.info_input }), _jsxs(HoverCardContent, { align: align, className: "bg-[#0A0D14] text-[#CDD0D5] text-xs font-normal border-none", children: [fieldName ? (_jsx("p", { className: "text-sm font-medium text-white first-letter:uppercase", children: fieldName })) : null, children] })] }));
}
export default InfoCard;
//# sourceMappingURL=InfoCard.js.map
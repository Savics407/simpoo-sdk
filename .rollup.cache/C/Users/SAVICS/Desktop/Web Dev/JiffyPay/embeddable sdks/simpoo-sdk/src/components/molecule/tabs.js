import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";
const tabsData = [
    {
        label: "All",
        count: 900,
    },
    {
        label: "Active",
        count: 10,
    },
    {
        label: "Inactive",
        count: 0,
    },
];
function Tabs({ tabs = tabsData, loading, }) {
    const [activeTab, setActiveTab] = useState(0);
    const switchTab = (tab, index) => {
        tab.link ? null : setActiveTab(index), tab.action && tab.action();
    };
    return (_jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: "flex gap-[30px]", children: tabs.map((tab, index) => (_jsxs("button", { className: "flex items-center gap-2.5 group relative pb-2", onClick: () => switchTab(tab, index), children: [_jsx("p", { className: cn(`group-hover:text-gray-900 duration-200 text-gray-800 font-normal text-sm first-letter:uppercase`, index === activeTab ? "text-gray-900 font-semibold" : null), children: tab.label }), loading ? (_jsx(Skeleton, { className: "h-[26px] rounded w-8" })) : (_jsxs(_Fragment, { children: [" ", tab.count >= 0 ? (_jsx("span", { className: cn(`rounded px-[7px] h-[26px] flex items-center text-xs font-semibold duration-200 group-hover:bg-primary_light group-hover:text-primary  bg-gray-200 text-gray-500`, index === activeTab
                                        ? "bg-primary_light text-primary"
                                        : null), children: tab.count })) : null] })), index === activeTab ? (_jsx("div", { className: "h-[5px] rounded bg-primary absolute left-0 right-0 -bottom-[5px]" })) : null] }, index))) }), _jsx("div", { className: " h-[5px] rounded bg-gray-300" })] }));
}
export default Tabs;
//# sourceMappingURL=tabs.js.map
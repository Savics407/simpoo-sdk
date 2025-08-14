import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { icons } from "../../../assets/icons";
import { formatToCurrency } from "../../../store/actions/utility";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../ui/dropdown-menu";
import { cn } from "../../../lib/utils";
import Container from "../../atoms/container";
import { Skeleton } from "../../ui/skeleton";
import { Collapse } from "react-collapse";
function ItemsOverview({ loading, data, meta, }) {
    const otherSellingPrices = data?.otherscount?.map((other) => {
        const othername = other.name;
        return {
            type: othername,
            value: data?.result_array?.[othername]?.total_selling_price ?? 0,
        };
    });
    const totalSellingPrice = [
        {
            type: data?.result_array?.Retail?.pricegroup ?? data?.default,
            value: data?.result_array?.Retail?.total_selling_price ?? 0,
        },
        ...(otherSellingPrices || []),
    ];
    const otherProfits = data?.otherscount?.map((other) => {
        const othername = other.name;
        return {
            type: othername,
            value: data?.result_array?.[othername]?.total_profit ?? 0,
        };
    });
    const profitToBeMade = [
        {
            type: data?.result_array?.Retail?.pricegroup ?? data?.default,
            value: data?.result_array?.Retail?.total_profit ?? 0,
        },
        ...(otherProfits || []),
    ];
    const [sellingPrice, setSellingPrice] = useState({
        type: totalSellingPrice?.[0].type,
        value: totalSellingPrice?.[0].value,
    });
    const [profit, setProfit] = useState({
        type: profitToBeMade?.[0].type,
        value: profitToBeMade?.[0].value,
    });
    React.useEffect(() => {
        setSellingPrice({
            type: totalSellingPrice?.[0].type,
            value: totalSellingPrice?.[0].value,
        });
        setProfit({
            type: profitToBeMade?.[0].type,
            value: profitToBeMade?.[0].value,
        });
    }, [loading]);
    const kpis = [
        {
            label: "Total No. of Unique Item",
            count: Intl.NumberFormat().format(meta?.total ?? 0),
            desc: `With ${data?.unit_count ?? 0} unit(s)`,
            icon: (_jsx("div", { className: "shrink-0 rounded-lg bg-[#EFF5FF] w-12 h-12 flex items-center justify-center border border-[#EDEEF1]", children: icons.cube })),
        },
        {
            label: "Total Cost Price",
            count: formatToCurrency(data?.result_array?.Retail?.total_cost ?? 0),
            desc: "Takes into Account FIFO & LIFO ",
            icon: (_jsx("div", { className: "shrink-0 rounded-lg bg-[#F9DFDD] w-12 h-12 flex items-center justify-center border border-[#EDEEF1]", children: React.cloneElement(icons.price_tag, {
                    fill: "#ED7400",
                }) })),
        },
        {
            label: "Total Selling Price",
            count: formatToCurrency(sellingPrice.value),
            desc: (_jsxs("p", { className: "flex gap-2 items-center flex-wrap", children: ["Showing ", sellingPrice.type, " price", " ", _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs("button", { className: "rounded-lg h-8 flex items-center justify-between p-3 font-semibold text-xs text-gray-600 outline-none border border-gray-300 gap-2.5 capitalize bg-[#F9F9F9]", children: ["change", _jsx("span", { className: "rotate-90", children: icons.arrow })] }) }), _jsx(DropdownMenuContent, { align: "start", className: "flex flex-col gap-2.5 rounded-xl border-gray-200 py-2.5 w-[210px]", children: totalSellingPrice.map((value, dindex) => (_jsx(DropdownMenuItem, { className: cn(`capitalize focus:bg-primary_light rounded-md focus:text-primary font-semibold  text-sm cursor-pointer px-[15px] flex items-center gap-[5px] 
                      
                       `, value.type === sellingPrice.type
                                        ? "bg-primary_light text-primary"
                                        : null), onClick: () => setSellingPrice((prevData) => ({
                                        ...prevData,
                                        value: value.value,
                                        type: value.type,
                                    })), children: value.type }, dindex))) })] })] })),
            icon: (_jsx("div", { className: "shrink-0 rounded-lg bg-[#D8CDF4] w-12 h-12 flex items-center justify-center border border-[#EDEEF1]", children: React.cloneElement(icons.price_tag, {
                    fill: "#9747FF",
                }) })),
        },
        {
            label: "Profit to be made",
            count: formatToCurrency(profit.value),
            desc: (_jsxs("p", { className: "flex gap-2 items-center flex-wrap", children: ["Showing ", profit.type, " price", " ", _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs("button", { className: "rounded-lg h-8 flex items-center justify-between p-3 font-semibold text-xs text-gray-600 outline-none border border-gray-300 gap-2.5 capitalize bg-[#F9F9F9]", children: ["change", _jsx("span", { className: "rotate-90", children: icons.arrow })] }) }), _jsx(DropdownMenuContent, { align: "start", className: "flex flex-col gap-2.5 rounded-xl border-gray-200 py-2.5 w-[210px]", children: profitToBeMade.map((value, dindex) => (_jsx(DropdownMenuItem, { className: cn(`capitalize focus:bg-primary_light rounded-md focus:text-primary font-semibold  text-sm cursor-pointer px-[15px] flex items-center gap-[5px] 
                      
                       `, value.type === profit.type
                                        ? "bg-primary_light text-primary"
                                        : null), onClick: () => setProfit((prevData) => ({
                                        ...prevData,
                                        value: value.value,
                                        type: value.type,
                                    })), children: value.type }, dindex))) })] })] })),
            icon: (_jsx("div", { className: "shrink-0 rounded-lg bg-[#C6E3D2] w-12 h-12 flex items-center justify-center border border-[#EDEEF1]", children: React.cloneElement(icons.price_tag, {
                    fill: "#378C5A",
                }) })),
        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs(Container, { className: "bg-[#F6F8FA] p-2.5 flex flex-col", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h1", { className: "capitalize text-dark font-semibold text-lg", children: "Items overview" }), _jsxs("button", { className: "rounded-lg h-8 flex items-center justify-between p-3 font-semibold text-xs text-gray-600 outline-none border border-gray-300 gap-2.5 capitalize bg-white", onClick: () => setIsOpen(!isOpen), children: [isOpen ? "Close" : "Open", " ", _jsx("span", { className: "rotate-90", children: icons.arrow })] })] }), _jsx(Collapse, { isOpened: isOpen, children: _jsx("div", { className: "flex flex-wrap gap-2.5 mt-3", children: kpis.map((kpi, index) => (_jsxs("div", { className: cn("border rounded-xl border-[#E4E7EC] p-4 flex flex-col relative bg-right-bottom bg-no-repeat flex-auto", index === 0
                            ? "bg-[#E4EEFA] bg-[url('/assets/images/ecstacy1.svg')]"
                            : index === 1
                                ? "bg-[#FAEAE9] bg-[url('/assets/images/ecstacy2.svg')]"
                                : index === 2
                                    ? "bg-[#EEE9FA] bg-[url('/assets/images/ecstacy3.svg')]"
                                    : index === 3
                                        ? "bg-[#EBF5EF] bg-[url('/assets/images/ecstacy4.svg')]"
                                        : null), children: [_jsxs("div", { className: "flex justify-between gap-1", children: [_jsx("h1", { className: "text-dark text-sm font-medium", children: kpi.label }), _jsx("div", { className: "shrink-0", children: kpi.icon })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [loading ? (_jsx(Skeleton, { className: "w-28 h-6 rounded" })) : (_jsx("h1", { className: cn("text-dark font-bold text-[29px] truncate", index === kpis.length - 1 && profit.value < 0
                                            ? "text-danger"
                                            : null), title: kpi.count, children: kpi.count })), _jsx("div", { className: "text-gray-700 text-sm font-medium ", children: kpi.desc })] })] }, index))) }) })] }));
}
export default ItemsOverview;
//# sourceMappingURL=items-overview.js.map
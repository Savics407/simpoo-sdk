import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import moment from "moment";
import { useState } from "react";
import { addCommasToNumber, formatToCurrency, } from "../../../store/actions/utility";
import Select from "../../atoms/simpoo-select";
import placeholder from "../../../assets/images/image-placeholder.png";
import { cn } from "../../../lib/utils";
import { Separator } from "../../ui/separator";
import { icons } from "../../../assets/icons";
function ItemViewOverview({ data }) {
    const [sellingPrice, setSellingPrice] = useState(data?.total_selling_price || 0);
    const itemKpi = [
        {
            label: "Stock Quantity",
            value: addCommasToNumber(Number(data?.quantity)),
            desc: null,
        },
        {
            label: "Total Cost",
            value: formatToCurrency(Number(data?.total_cost_price)),
            desc: null,
        },
        {
            label: "Total Selling Price",
            value: formatToCurrency(sellingPrice),
            desc: (_jsx(Select, { options: data?.prices?.map((price) => {
                    return {
                        label: price.priceGroup.name,
                        value: price.selling_price.toString(),
                    };
                }), onValueChange: (e) => setSellingPrice(Number(e)), value: sellingPrice?.toString(), triggerClass: "h-8", showSearch: false, placeholder: "Select price" })),
        },
        {
            label: "Profit to be made",
            value: formatToCurrency(sellingPrice - data?.total_cost_price),
            desc: null,
        },
    ];
    const itemCodes = [
        {
            tag: "Barcode",
            value: data?.barcode.map((code) => code.barcode),
        },
        {
            tag: "SKU",
            value: data?.sku,
        },
        {
            tag: "System code",
            value: data?.itemcode.toString(),
        },
    ];
    const supplierHeader = [
        "S/N",
        "Batch number",
        "Quantity",
        "Expiry date",
        "Unit cost",
    ];
    const tables = [
        {
            tag: "Extras",
            headers: [
                "S/N",
                "image",
                "extra name",
                "quantity inside ",
                "selling price",
            ],
            body: data?.extras?.map((extra, index) => (_jsxs("tr", { className: "text-dark text-sm", children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: _jsx("div", { className: "w-9 h-9 shrink-0 relative", children: _jsx("img", { alt: "item image", src: placeholder, className: "object-cover w-full h-full" }) }) }), _jsx("td", { children: extra.extra.name }), _jsxs("td", { children: [extra.quantity, " ", extra.extra.item_unit] }), _jsx("td", { children: formatToCurrency(Number(extra.selling_price)) })] }, index))) || [],
        },
        {
            tag: "Raw materials",
            headers: [
                "S/N",
                "image",
                "material name",
                "quantity inside ",
                "selling price",
            ],
            body: data?.material?.map((material, index) => (_jsxs("tr", { className: "text-dark text-sm", children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: _jsx("div", { className: "w-9 h-9 shrink-0 relative", children: _jsx("img", { alt: "item image", src: placeholder, className: "object-cover w-full h-full" }) }) }), _jsx("td", { children: material.raw_material?.name }), _jsxs("td", { children: [material.quantity, " ", material.raw_material?.item_unit] }), _jsx("td", { children: formatToCurrency(Number(material.selling_price)) })] }, index))),
        },
        {
            tag: "Packing groups",
            headers: [
                "S/N",
                "image",
                "group name",
                "quantity inside ",
                "selling price",
                "Group code",
                "print label",
            ],
            body: data?.item_group?.map((group, index) => (_jsxs("tr", { className: "text-dark text-sm", children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: _jsx("div", { className: "w-9 h-9 shrink-0 relative", children: _jsx("img", { alt: "item image", src: placeholder, className: "object-cover w-full h-full" }) }) }), _jsx("td", { children: group.group_name }), _jsxs("td", { children: [group.quantity, " ", data.item_unit] }), _jsx("td", { children: formatToCurrency(Number(group.selling_price)) }), _jsx("td", { children: group.barcode }), _jsx("td", { children: _jsx("button", { className: "w-6 h-6 items-center flex justify-center", children: icons.printer_blue }) })] }, index))),
        },
        {
            tag: "Variations",
            headers: [
                "S/N",
                "image",
                "variation",
                "quantity ",
                "selling price",
                "code",
                "print label",
            ],
            body: data?.variation?.map((body, index) => (_jsxs("tr", { className: "text-dark text-sm", children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: _jsx("div", { className: "w-9 h-9 shrink-0 relative", children: _jsx("img", { alt: "item image", src: body.image ?? placeholder, className: "object-cover w-full h-full" }) }) }), _jsx("td", { children: body.variation_values.map((values, index) => (_jsxs("span", { className: "pr-2", children: [values.attribute_value.value_name, " ", body?.variation_values?.length - 1 > index && "-"] }, index))) }), _jsxs("td", { children: [body.quantity, data?.item_unit] }), _jsx("td", { children: formatToCurrency(Number(body.locationprices?.[0]?.selling_price)) }), _jsx("td", { children: body.barcode }), _jsx("td", { children: _jsx("button", { className: "w-6 h-6 items-center flex justify-center", children: icons.printer_blue }) })] }, index))),
        },
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-4 gap-2.5", children: itemKpi.map((item, index) => (_jsxs("div", { className: "border rounded-xl border-gray-200 p-4 gap-4 flex flex-col", children: [_jsx("p", { className: "text-dark text-sm font-medium", children: item.label }), _jsxs("p", { title: item.value, className: cn("text-dark font-bold text-3xl truncate", index === itemKpi.length - 1 &&
                                Number(sellingPrice) - Number(data?.cost_price) < 0
                                ? "text-danger"
                                : null), children: [item.value, index === 0 && (_jsx("span", { className: "font-normal text-sm", children: data.item_unit }))] }), item.desc] }, index))) }), _jsx("div", { className: "grid grid-cols-12", children: _jsxs("div", { className: "col-span-10 space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "border-b border-gray-300 pb-2.5 text-gray-800 font-semibold ", children: "Item codes:" }), _jsx("div", { className: "flex gap-5", children: itemCodes.map((code, index) => (_jsxs(_Fragment, { children: [_jsxs("div", { className: cn("flex flex-col gap-2.5"), children: [_jsx("p", { className: "text-dark text-sm font-medium", children: code.tag }), _jsx("p", { className: "text-gray-500 text-sm font-normal flex flex-col gap-2", children: Array.isArray(code.value)
                                                            ? code.value?.map((value, index) => (_jsx("span", { children: value }, index)))
                                                            : code.value })] }, index), index < itemCodes.length - 1 && (_jsx("div", { children: _jsx(Separator, { orientation: "vertical", className: "bg-[#7E8299]" }) }, index))] }))) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "border-b border-gray-300 pb-2.5 text-gray-800 font-semibold ", children: "Suppliers:" }), _jsx("div", { className: "flex gap-5 flex-col", children: data?.suppliers?.map((supplier, index) => (_jsxs("div", { className: "bg-gray-100 rounded-xl p-[15px] space-y-[18px]", children: [_jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "w-9 h-9 shrink-0 relative", children: _jsx("img", { alt: "item image", src: placeholder, className: "object-cover w-full h-full" }) }), _jsxs("div", { className: "space-y-1 flex-grow border-b border-dashed border-gray-300 pb-1", children: [_jsx("h1", { className: "text-dark font-semibold text-sm capitalize", children: supplier.name }), _jsx("p", { className: "text-gray-700 font-medium text-[13px] capitalize" })] })] }), _jsxs("table", { className: "table-auto w-full border-separate border-spacing-y-3", children: [_jsx("thead", { children: _jsx("tr", { children: supplierHeader.map((header, index) => (_jsx("th", { className: "text-left text-dark", children: header }, index))) }) }), _jsx("tbody", { children: _jsxs("tr", { className: "text-dark text-sm", children: [_jsx("td", { children: "1" }), _jsx("td", { children: _jsx("div", { className: "w-9 h-9 shrink-0 relative", children: supplier.supplier_batch_number }) }), _jsx("td", { children: supplier.supplier_quantity }), _jsx("td", { children: moment(supplier.supplier_expired_date).format("MMMM DD, YYYY") }), _jsx("td", { children: formatToCurrency(Number(supplier.supplier_price)) })] }) })] })] }, index))) })] }), tables.map((table, index) => (_jsxs("div", { className: "space-y-3", children: [_jsxs("p", { className: "border-b border-gray-300 pb-2.5 text-gray-800 font-semibold ", children: [table.tag, ": ", table.body?.length] }), table.body?.length > 0 ? (_jsx("div", { className: "bg-gray-100 rounded-xl p-[15px] space-y-[18px]", children: _jsxs("table", { className: "table-auto w-full border-separate border-spacing-y-3", children: [_jsx("thead", { children: _jsx("tr", { children: table.headers.map((header, index) => (_jsx("th", { className: "text-left text-dark first-letter:uppercase", children: header }, index))) }) }), _jsx("tbody", { children: table.body })] }) })) : null] }, index)))] }) })] }));
}
export default ItemViewOverview;
//# sourceMappingURL=item-view-overview.js.map
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from "react";
import { cn } from "../../../lib/utils";
import { addCommasToNumber, formatToCurrency, } from "../../../store/actions/utility";
import InfoCard from "../../atoms/InfoCard";
import StatusComponent from "../../atoms/status-component";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../ui/dropdown-menu";
import { icons } from "../../../assets/icons";
import ItemView from "../../modals/items/item-view";
import DeleteItem from "../../modals/items/delete-item";
import InlineUpdate from "../../atoms/inline-update";
export const itemColumns = [
    //   {
    //     id: "select",
    //     header: ({ table }) => (
    //       <Checkbox
    //         checked={
    //           table.getIsAllPageRowsSelected() ||
    //           (table.getIsSomePageRowsSelected() && "indeterminate")
    //         }
    //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //         aria-label="Select all"
    //         className="!border-gray-600 h-6 w-6 rounded-[7px] data-[state=checked]:bg-primary data-[state=checked]:border-none"
    //       />
    //     ),
    //     cell: ({ row }) => (
    //       <Checkbox
    //         checked={row.getIsSelected()}
    //         onCheckedChange={(value) => row.toggleSelected(!!value)}
    //         aria-label="select row"
    //         className="!border-gray-600 h-6 w-6 rounded-[7px] data-[state=checked]:bg-primary data-[state=checked]:border-none"
    //       />
    //     ),
    //   },
    {
        accessorKey: "item_description",
        header: "item description",
        cell: ({ row }) => {
            const item = row.original;
            return (_jsxs("div", { className: "flex items-center gap-5", children: [_jsx("div", { className: "w-[50px] h-[50px] rounded-2xl relative bg-gray-100", children: _jsx("img", { src: item.item_image, alt: "item image", className: "rounded-2xl object-cover w-full h-full", draggable: false }) }), _jsxs("div", { className: "space-y-1 max-w-[265px]", children: [_jsx(Title, { title: item.item_description, item_uuid: item.uuid, item_type_id: item.item_type_id, data: item.fullData }), _jsxs("p", { className: "text-dark text-xs font-normal flex items-center gap-1", children: [_jsx("span", { className: "uppercase whitespace-nowrap", children: item.sku }), item.barcode?.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("span", { children: "|" }), item.barcode?.[0]?.barcode, item.barcode?.length > 1 ? (_jsxs("span", { className: "rounded bg-[#9747FF1A] px-[5px] flex items-center text-[#7239EA] font-semibold text-[11px] h-[18px]", children: ["+", item.barcode?.length - 1] })) : null] })) : null, item.expired ? (_jsxs(_Fragment, { children: [_jsx("span", { children: "|" }), "Expired", _jsx("span", { className: "rounded bg-danger_light px-[5px] flex items-center text-danger font-semibold text-[11px] h-[18px]", children: item.expired })] })) : null, item.expiring ? (_jsxs(_Fragment, { children: [_jsx("span", { children: "|" }), "Expiring", _jsx("span", { className: "rounded bg-warning-light px-[5px] flex items-center text-warning font-semibold text-[11px] h-[18px]", children: item.expiring })] })) : null] })] })] }));
        },
    },
    {
        accessorKey: "quantity",
        header: () => _jsx("p", { children: "quantity" }),
        cell: ({ row }) => {
            const item = row.original;
            return (_jsxs(_Fragment, { children: [_jsx("div", { className: cn("flex items-center", item.quantity <= 0
                            ? "text-danger"
                            : Number(item.reorder_level) == item.quantity
                                ? "text-orange"
                                : null), children: _jsx(InlineUpdate, { label: "Edit item quantity", placeholder: "Enter quantity", uuid: item.uuid, name: "item_quantity", displayValue: addCommasToNumber(item.quantity) + item.unit, value: item.quantity, valueType: "number", item_unit: item.unit }) }), item.all_quantity === item.quantity ? null : (_jsx("p", { className: "text-gray-700", children: Intl.NumberFormat().format(item.all_quantity ?? 0) + item.unit }))] }));
        },
    },
    {
        accessorKey: "type",
        // header: "decimal",
        cell: ({ row }) => {
            const item = row.original;
            return _jsx("p", { className: "capitalize", children: item.type });
        },
    },
    {
        accessorKey: "selling_price",
        header: "Selling Price (₦)",
        cell: ({ row }) => {
            const item = row.original;
            return (_jsx(InlineUpdate, { label: "Edit selling price (\u20A6)", placeholder: "Enter selling price", uuid: item.uuid, name: "selling_price", displayValue: formatToCurrency(item.selling_price ?? 0), value: item.selling_price ?? 0, valueType: "number" })
            // <p>{formatToCurrency(item.selling_price ?? 0)}</p>
            );
        },
    },
    {
        accessorKey: "categories",
        header: "categories/Tags",
        cell: ({ row }) => {
            const item = row.original;
            return (_jsxs(_Fragment, { children: [" ", _jsxs("div", { className: "flex items-center gap-2 capitalize", children: [item.categories && item.categories?.length > 0
                                ? item.categories?.[0]?.name
                                : "...", item.categories.length > 1 ? (_jsx(InfoCard, { align: "center", fieldName: "Categories", trigger: _jsxs("button", { className: "rounded bg-[#9747FF1A] px-[5px] flex items-center text-[#7239EA] font-semibold text-[11px] h-[18px]", children: ["+", item.categories.length - 1] }), children: _jsx("ul", { className: "list-disc pl-4", children: item.categories.map((category, index) => (_jsx("li", { children: category.name }, index))) }) })) : null] }), _jsxs("div", { className: "text-gray-700 flex items-center gap-2 capitalize", children: [item.tags?.[0], item.tags?.length > 1 ? (_jsx(InfoCard, { align: "center", fieldName: "Tags", trigger: _jsxs("button", { className: "rounded bg-[#9747FF1A] px-[5px] flex items-center text-[#7239EA] font-semibold text-[11px] h-[18px] border-primary", children: ["+", item.tags.length - 1] }), children: _jsx("ul", { className: "list-disc pl-4", children: item.tags.map((tags, index) => (_jsx("li", { children: tags }, index))) }) })) : null] })] }));
        },
    },
    {
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return _jsx(StatusComponent, { status: status });
        },
    },
    {
        id: "actions",
        header: "actions",
        cell: ({ row }) => {
            const item = row.original;
            return (_jsx(DropDown, { item_uuid: item.uuid, item_type_id: item.item_type_id, data: item.fullData }));
        },
    },
];
const DropDown = ({ item_uuid, item_type_id, data, }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    // let hoveredIndex: any = null;
    const handleHover = (index) => {
        setHoveredIndex(index);
        // hoveredIndex = index;
    };
    const handleMouseOut = () => {
        setHoveredIndex(null);
        // hoveredIndex = null;
    };
    const [view, setView] = useState(false);
    const [edit, setEdit] = useState(false);
    const [label, setLabel] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false);
    const [duplicateItem, setDuplicateItem] = useState(false);
    const [deactivateItem, setDeactivateItem] = useState(false);
    const [updateDiscount, setUpdateDiscount] = useState(false);
    const toggleViewAndEdit = () => {
        setView(false);
        setEdit(true);
    };
    const actionMenu = [
        {
            label: "view",
            icon: icons.eye_outline,
            action: () => setView(true),
        },
        {
            label: "delete",
            icon: icons.trash,
            action: () => setDeleteItem(true),
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs("button", { className: "bg-gray-100 rounded-md h-[30px] w-[90px] flex items-center justify-between p-2.5 font-semibold text-[10px] text-gray-500 hover:border duration-200", children: ["Action", " ", _jsx("svg", { width: "11", height: "6", viewBox: "0 0 11 6", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M5.50855 5.49304C5.42081 5.49355 5.33383 5.47673 5.25261 5.44356C5.17138 5.41038 5.09751 5.3615 5.03521 5.29971L1.03521 1.29971C0.972726 1.23773 0.92313 1.164 0.889284 1.08276C0.855438 1.00152 0.838013 0.914383 0.838013 0.826375C0.838013 0.738367 0.855438 0.65123 0.889284 0.56999C0.92313 0.488751 0.972726 0.415017 1.03521 0.353041C1.16012 0.228874 1.32909 0.15918 1.50521 0.15918C1.68134 0.15918 1.8503 0.228874 1.97521 0.353041L5.50855 3.88637L9.03521 0.353041C9.16012 0.228874 9.32909 0.15918 9.50521 0.15918C9.68134 0.15918 9.8503 0.228874 9.97521 0.353041C10.0377 0.415017 10.0873 0.488751 10.1211 0.56999C10.155 0.65123 10.1724 0.738367 10.1724 0.826375C10.1724 0.914383 10.155 1.00152 10.1211 1.08276C10.0873 1.164 10.0377 1.23773 9.97521 1.29971L5.97521 5.29971C5.85104 5.42287 5.68344 5.4923 5.50855 5.49304Z", fill: "#202125" }) })] }) }), _jsx(DropdownMenuContent, { align: "end", className: "flex flex-col gap-2.5 rounded-xl  border-gray-200", children: actionMenu.map((action, index) => (_jsxs(DropdownMenuItem, { className: `capitalize focus:bg-primary_light rounded-md focus:text-primary font-semibold text-gray-700 text-sm cursor-pointer px-[15px] flex items-center gap-[5px] ${index === actionMenu.length - 1 &&
                                "text-danger  focus:text-danger"}`, onMouseOver: () => handleHover(index), onMouseOut: handleMouseOut, onClick: action.action, children: [React.cloneElement(action.icon, {
                                    fill: hoveredIndex === index ? "#1868DB" : "#5E6278",
                                }), " ", action.label] }, index))) })] }), _jsx(ItemView, { isOpen: view, onClose: () => setView(false), itemUUID: item_uuid }), _jsx(DeleteItem, { isOpen: deleteItem, onClose: () => setDeleteItem(false), uuids: [item_uuid], single: true })] }));
};
const Title = ({ title, item_uuid, item_type_id, data, }) => {
    const [view, setView] = useState(false);
    const [edit, setEdit] = useState(false);
    const [label, setLabel] = useState(false);
    const toggleViewAndEdit = () => {
        setView(false);
        setEdit(true);
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: cn(`text-primary font-bold text-sm first-letter:uppercase truncate max-w-[265px] cursor-pointer`, data.expired ? "text-danger" : ""), title: title, onClick: () => setView(true), children: title }), _jsx(ItemView, { isOpen: view, onClose: () => setView(false), itemUUID: item_uuid })] }));
};
//# sourceMappingURL=item-column.js.map
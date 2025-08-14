import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useFetchData, usePostData } from "../../../api/queryHooks";
import ModalLayout from "../../layouts/modal-layout";
import Select from "../../atoms/simpoo-select";
import { CategorySelector } from "../../atoms/category-selection";
import { MultipleSelector } from "../../atoms/multiSelect";
import Input from "../../atoms/input";
import Button from "../../atoms/button";
import { icons } from "../../../assets/icons";
import { useSDK } from "../../../context/SimpooProvider";
function CreateMuiltipleItems({ isOpen, onClose, }) {
    const { mutate, isPending } = usePostData();
    const queryClient = useQueryClient();
    const { apiKey } = useSDK();
    const { data: categories } = useFetchData([`categories`, apiKey], `/outbound/inventory_metas/categories`, {
        enabled: !!apiKey,
    });
    const { data: itemUnits } = useFetchData([`itemunits`, apiKey], `/outbound/inventory_metas/units`, {
        enabled: !!apiKey,
    });
    const { data: itemTags } = useFetchData([`itemtags`, apiKey], `/outbound/inventory_metas/tags`, {
        enabled: !!apiKey,
    });
    const { data: itemTypes } = useFetchData([`itemtypes`, apiKey], `/outbound/inventory_metas/types`, {
        enabled: !!apiKey,
    });
    const category = categories?.data?.data?.map((category) => {
        return {
            label: category.name,
            value: category.uuid,
            subOptions: category.subCategories.map((sub) => {
                return {
                    label: sub.name,
                    value: sub.uuid,
                };
            }),
        };
    }) || [];
    const itemUnit = itemUnits?.data?.data?.map((unit) => {
        return {
            label: unit.name,
            value: unit.uuid,
        };
    }) || [];
    const itemTag = itemTags?.data?.data?.map((unit) => {
        return {
            label: unit.name,
            value: unit.uuid,
        };
    });
    const itemTypesList = itemTypes?.data?.data
        ?.filter((type) => type.name === "products" || type.name === "services")
        .map((type) => {
        return {
            label: type.name,
            value: type.uuid,
        };
    }) || [];
    const [selectedTypeName, setSelectedTypeName] = useState("");
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [selectedTypes, setSelectedTypes] = useState(itemTypesList?.[0]?.value || "");
    useEffect(() => {
        const label = itemTypesList.find((type) => type?.value === selectedTypes)?.label ||
            "";
        setSelectedTypeName(label);
    }, [selectedTypes]);
    const [selectedTag, setSelectedTag] = useState([]);
    // const [names, setNames] = useState<Array<string>>([]);
    const [items, setItems] = useState([
        {
            name: "",
            itemunit_id: itemUnit?.[0]?.value || "",
            quantity: "",
            cost_price: "",
            selling_price: "",
            barcode: "",
        },
    ]);
    const updateItemFields = (name, value, index) => {
        const updatedItemFields = [...items];
        updatedItemFields[index] = {
            ...updatedItemFields[index],
            [name]: value,
        };
        setItems(updatedItemFields);
    };
    const addField = () => {
        setItems((prev) => [
            ...prev,
            {
                name: "",
                itemunit_id: itemUnit?.[0]?.value || "",
                quantity: "",
                cost_price: "",
                selling_price: "",
                barcode: "",
            },
        ]);
    };
    const removeItem = (index) => {
        const updatedItems = items.filter((_, id) => id !== index);
        setItems(updatedItems);
    };
    const storeMultiple = {
        itemtype_id: selectedTypes,
        itemcategory_id: selectedCategories,
        tags: selectedTag,
        items: items,
    };
    const createMultipleItems = () => {
        mutate({
            url: "/outbound/items/create_multiple",
            payload: storeMultiple,
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["items"] });
                onClose && onClose();
            },
        });
    };
    const tableHead = [
        "Item name",
        "Item unit",
        ...(selectedTypeName !== "services" ? ["Quantity", "Barcode"] : []),
        "Cost price (₦)",
        "Selling price (₦)",
    ];
    return (_jsxs(ModalLayout, { isOpen: isOpen, onClose: onClose, title: "Quick create multiple items", className: "max-w-[1024px]", children: [_jsxs("div", { className: "px-5 space-y-7 pb-5", children: [_jsxs("div", { className: "grid grid-cols-3 gap-5 bg-gray-100 rounded-xl p-4", children: [_jsx(Select, { label: "Item type", options: itemTypesList, placeholder: "select item type", value: selectedTypes, onValueChange: (value) => setSelectedTypes(value), required: true, info: "Select the type of item you're creating (e.g., product, service, variations, kits ). This classification helps determine how the item is managed, displayed, or fulfilled." }), _jsx(CategorySelector, { placeholder: "select categories", label: "Category", options: category, values: selectedCategories, onChange: (values) => setSelectedCategories(values), showMultiSelectValues: false, showCount: true, info: "Select the category that best describes this item(s) (e.g., electronics, clothing, food). Categorizing items helps in organizing inventory and simplifies product management." }), _jsx(MultipleSelector, { label: "Item tag", placeholder: "Select item tags", info: "Enter relevant keywords or labels for this item(s). Tags help in categorizing and making the item easier to find through search filters.", labelClass: "text-dark text-sm", options: itemTag, values: selectedTag, onChange: setSelectedTag, showSearch: true, showCount: true, showMultiSelectValues: false })] }), _jsxs("div", { className: "space-y-2 overflow-auto", children: [_jsxs("table", { className: "table-auto w-full border-separate border-spacing-4", children: [_jsx("thead", { children: _jsx("tr", { children: tableHead.map((head, index) => (_jsx("th", { className: "text-dark text-sm font-medium text-left", children: head }, index))) }) }), _jsx("tbody", { className: "text-dark text-[15px] ", children: items.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { className: "", children: _jsx(Input, { type: "text", placeholder: "Enter item name", value: item.name, onChange: (e) => updateItemFields("name", e.target.value, index) }) }), _jsx("td", { children: _jsx(Select, { options: itemUnit, placeholder: "select item unit", value: item.itemunit_id, onValueChange: (value) => updateItemFields("itemunit_id", value, index) }) }), selectedTypeName !== "services" ? (_jsxs(_Fragment, { children: [_jsx("td", { className: "", children: _jsx(Input, { type: "number", placeholder: "0", value: item.quantity, onChange: (e) => updateItemFields("quantity", e.target.value, index) }) }), _jsx("td", { className: "", children: _jsx(Input, { type: "number", placeholder: "Enter barcode", value: item.barcode, onChange: (e) => updateItemFields("barcode", e.target.value, index) }) })] })) : null, _jsx("td", { className: "", children: _jsx(Input, { type: "number", placeholder: "0.00", value: item.cost_price, onChange: (e) => updateItemFields("cost_price", e.target.value, index) }) }), _jsx("td", { className: "", children: _jsx(Input, { type: "number", placeholder: "0.00", value: item.selling_price, onChange: (e) => updateItemFields("selling_price", e.target.value, index) }) }), _jsx("td", { className: "", children: _jsx("button", { onClick: () => removeItem(index), disabled: items.length === 1, className: "disabled:cursor-not-allowed disabled:opacity-70", children: icons.trash2 }) })] }, index))) })] }), _jsx(Button, { mode: "text", label: "Add more", left_addon: icons.plus_squared2, onClick: addField, className: "font-medium text-sm ml-4" })] })] }), _jsxs("div", { className: "flex justify-between items-center px-5 sticky bottom-0 bg-white py-5 border-t ", children: [_jsxs("button", { className: "text-primary text-sm font-medium flex items-center gap-1", children: [icons.question, " Need help?"] }), _jsxs("div", { className: "flex justify-end gap-2.5", children: [_jsx(Button, { label: "Cancel", className: "bg-[#F1F1F2] text-[#181C32] hover:bg-[#F1F1F2]/90", onClick: onClose }), _jsx(Button, { label: "Create Items", onClick: createMultipleItems, loading: isPending })] })] })] }));
}
export default CreateMuiltipleItems;
//# sourceMappingURL=create-multiple-items.js.map
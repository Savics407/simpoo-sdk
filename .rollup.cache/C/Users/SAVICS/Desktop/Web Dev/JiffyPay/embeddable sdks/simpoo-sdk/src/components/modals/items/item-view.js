import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useFetchData } from "../../../api/queryHooks";
import moment from "moment";
import SideViewModalLayout from "../../layouts/side-view-modal-layout";
import ItemViewLoader from "../../molecule/item-view-loader";
import ItemViewPreview from "../../widgets/inventory/item-view-preview";
import ItemViewOverview from "../../widgets/inventory/item-view-overview";
import Tabs from "../../molecule/tabs";
function ItemView({ isOpen, onClose, itemUUID, }) {
    const { data, isFetching } = useFetchData(["single_item", itemUUID], `/outbound/items/get?item_uuid=${itemUUID}`, {
        enabled: isOpen,
    });
    const itemData = data?.data;
    const moreOptions = [
        {
            label: "more items list here",
            action: () => alert(true),
        },
    ];
    const itemMeta = [
        {
            tag: "Created",
            value: moment(itemData?.created_date).format("MMMM DD, YYYY"),
        },
        {
            tag: "Last edited",
            value: moment(itemData?.last_update_date).format("MMMM DD, YYYY"),
        },
        {
            tag: "Expiry",
            value: (_jsxs("p", { className: "", children: [" ", _jsxs("span", { className: "text-danger", children: [itemData?.expired, " Expired,"] }), " ", _jsxs("span", { className: "text-warning", children: [itemData?.expiring, " Expiring"] })] })),
        },
    ];
    const [currentTab, setCurrentTab] = useState(1);
    const tabs = [
        {
            label: "Item overview",
            action: () => setCurrentTab(1),
        },
        // {
        //   label: "Item statement",
        //   action: () => setCurrentTab(2),
        // },
        // {
        //   label: "Item trail",
        //   action: () => setCurrentTab(3),
        // },
    ];
    useEffect(() => {
        !isOpen && setCurrentTab(1);
    }, [isOpen]);
    return (_jsx(SideViewModalLayout, { isOpen: isOpen, onClose: onClose, title: "Item View", className: "w-[1176px]", children: isFetching ? (_jsx(ItemViewLoader, {})) : (_jsxs("div", { className: "space-y-7", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("h1", { className: "text-dark text-xl font-semibold flex items-center gap-2", children: [itemData?.name, _jsx("span", { className: "bg-primary_light text-primary text-xs rounded px-[7px] h-5 flex items-center capitalize", children: itemData?.item_type?.name })] }), _jsx("div", { className: "flex gap-2", children: itemMeta.map((meta, index) => (_jsxs("p", { className: "text-sm font-medium text-gray-700 flex items-center gap-2", children: [_jsxs("span", { className: "text-dark", children: [meta.tag, ":"] }), " ", meta.value, " ", index < 2 && "|"] }, index))) })] }), _jsx("div", { className: "flex gap-3" })] }), _jsx(ItemViewPreview, { data: itemData }), _jsx(Tabs, { tabs: tabs }), currentTab === 1 ? _jsx(ItemViewOverview, { data: itemData }) : null] })) }));
}
export default ItemView;
//# sourceMappingURL=item-view.js.map
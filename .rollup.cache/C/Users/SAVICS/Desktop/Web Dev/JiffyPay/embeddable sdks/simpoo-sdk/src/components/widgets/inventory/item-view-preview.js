import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ImagePreviews from "./image-previews";
import { addCommasToNumber, formatToCurrency, } from "../../../store/actions/utility";
import { Separator } from "../../ui/separator";
function ItemViewPreview({ data, printLabel, }) {
    const counts = [
        {
            tag: "reorder level",
            value: `${data?.reorder_level} ${data?.unit_resource?.name}`,
        },
        {
            tag: "packing groups",
            value: `${data?.item_group?.length} group(s)`,
        },
        {
            tag: "variations",
            value: `${data?.variation?.length}  variable(s)`,
        },
        {
            tag: "extras",
            value: `${data?.extras?.length} extras`,
        },
    ];
    return (_jsxs("div", { className: "grid grid-cols-3 gap-6", children: [_jsx(ImagePreviews, { images: data?.images?.map((image) => image.image) }), _jsxs("div", { className: "col-span-2 flex flex-col gap-9", children: [_jsxs("div", { className: "flex gap-4 bg-primary_light p-2.5 rounded-md", children: [_jsxs("p", { className: "text-gray-700 text-sm font-medium", children: ["Cost price:", " ", _jsx("span", { className: "text-dark font-bold text-[15px]", children: formatToCurrency(Number(data?.cost_price)) })] }), _jsxs("p", { className: "text-gray-700 text-sm font-medium", children: ["Selling price:", " ", data?.duplicate_prices?.map((price, index) => (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-dark font-bold text-[15px] px-2", children: formatToCurrency(Number(price.selling_price)) }, index), index < data?.duplicate_prices?.length - 1 && "-"] })))] })] }), _jsxs("div", { className: "flex gap-2.5", children: [_jsxs("p", { className: "text-gray-800 text-sm font-medium", children: ["In stock:", " ", _jsxs("span", { className: "text-dark font-bold text-[15px]", children: [addCommasToNumber(Number(data?.quantity)), " ", data?.item_unit] })] }), "|", _jsxs("p", { className: "text-gray-700 text-sm font-medium", children: ["Total sold:", " ", _jsxs("span", { className: "text-dark font-bold text-[15px]", children: [addCommasToNumber(data?.total_sold), " ", data?.item_unit] })] })] }), _jsxs("div", { className: "space-y-2.5", children: [_jsx("h2", { className: "text-gray-800 text-sm font-bold", children: "Description" }), _jsx("p", { className: "text-gray-800 font-normal text-sm", children: data?.description ?? "No description..." })] }), _jsx("div", { className: "flex gap-5 items-center", children: counts.map((count, index) => (_jsxs("div", { className: "flex gap-5 items-center", children: [_jsxs("div", { className: "flex flex-col gap-2.5", children: [_jsx("p", { className: "text-dark font-medium text-sm first-letter:uppercase", children: count.tag }), _jsx("p", { className: "text-primary", children: count.value })] }), index < counts.length - 1 && (_jsx(Separator, { className: "bg-[#7E8299] h-[30px] w-[1px]" }))] }, index))) }), _jsxs("div", { className: "flex gap-2.5 items-center", children: [_jsxs("p", { className: "text-gray-700 text-sm font-medium flex gap-2", children: ["Category:", " ", data?.category?.map((category, index) => (_jsxs("span", { className: "text-dark font-normal text-[15px]", children: [category.name, " "] }, index)))] }), _jsx(Separator, { className: "bg-[#7E8299] h-[14px] w-[1px]" }), _jsxs("p", { className: "text-gray-700 text-sm font-medium", children: ["Collection:", " ", data?.item_tags?.map((tag, index) => (_jsx("span", { className: "text-dark font-normal text-[15px]", children: tag.name }, index)))] })] })] })] }));
}
export default ItemViewPreview;
//# sourceMappingURL=item-view-preview.js.map
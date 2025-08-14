import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../ui/dropdown-menu";
import Pagination from "@mui/material/Pagination";
import { cn } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { icons } from "../../assets/icons";
import { setCurrentPage, setPerview } from "../../store/reducers/appSlice";
function PaginationComponent({ showBulkActions = true, meta, }) {
    const dispatch = useDispatch();
    const { currentPage, perview } = useSelector((state) => state.app);
    const handleChange = (e, p) => {
        dispatch(setCurrentPage(p));
        // console.log(e, p);
    };
    const bulkActions = [
        {
            label: "Delete marked",
            action: () => alert("not added yet"),
        },
        {
            label: "Duplicate marked",
            action: () => alert("not added yet"),
        },
        {
            label: "Edit marked",
            action: () => alert("not added yet"),
        },
        {
            label: "Move to draft",
            action: () => alert("not added yet"),
        },
        {
            label: "Report",
            action: () => alert("not added yet"),
        },
    ];
    const rowsPerPage = [7, 10, 20];
    // const [perPage, setPerPage] = useState<number>();
    useEffect(() => {
        meta && currentPage > meta?.last_page ? dispatch(setCurrentPage(1)) : null;
    }, [meta?.per_page]);
    return (_jsxs("div", { className: cn("flex items-center justify-between gap-4 flex-wrap", meta && meta?.total > 0 ? null : "hidden"), children: [showBulkActions ? (_jsxs("div", { className: "flex items-center gap-2.5 shrink-0", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs("button", { className: "rounded-md h-9  flex items-center justify-between p-3 font-semibold text-xs text-gray-600 outline-none border border-gray-300 gap-2.5 ", children: [perview, _jsx("span", { className: "rotate-90", children: icons.arrow })] }) }), _jsx(DropdownMenuContent, { align: "center", className: "flex flex-col gap-2.5 rounded-xl border-gray-200 py-2.5", children: rowsPerPage.map((count, index) => (_jsx(DropdownMenuItem, { className: `capitalize focus:bg-primary_light rounded-md focus:text-primary font-semibold  text-sm cursor-pointer px-[15px] flex items-center gap-[5px] ${perview === count
                                        ? "bg-primary_light text-primary"
                                        : "text-gray-700"}  `, onClick: () => dispatch(setPerview(count)), children: count }, index))) })] }), _jsxs("p", { className: "font-normal text-gray-600 text-[15px]", children: ["Showing ", meta?.from, " - ", meta?.to, " of ", meta?.total] })] })) : null, _jsx(Pagination, { count: meta?.last_page || 1, page: meta?.current_page ?? 1, shape: "rounded", color: "primary", onChange: handleChange })] }));
}
export default PaginationComponent;
//# sourceMappingURL=pagination-component.js.map
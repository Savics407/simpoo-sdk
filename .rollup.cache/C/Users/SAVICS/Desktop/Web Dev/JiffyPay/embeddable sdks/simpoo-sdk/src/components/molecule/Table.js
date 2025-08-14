import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { flexRender, useReactTable, getCoreRowModel, } from "@tanstack/react-table";
import { Table as ShadTable, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table";
import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";
import PaginationComponent from "./pagination-component";
import { icons } from "../../assets/icons";
import ItemEmpty from "./ItemEmpty";
export function Table({ columns, data, tbhRowClass, tHeadClass, tbCellClass, meta, showBulkActions, showPaginate = true, emptyData, emptyProps, loading, 
//   actions,
//   moreOptions,
accordionData, hasAccordion, bodyRowClass, tableContainerClass, firstCellClass, lastCellClass, showAccordionDropdown = true, onToggleAccordion, }) {
    const [openRowIndex, setOpenRowIndex] = useState(null);
    // const [rowSelection, setRowSelection] = useState<any>({});
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // onRowSelectionChange: setRowSelection,
    });
    const toggleAccordion = (index, row) => {
        setOpenRowIndex((prev) => (prev === index ? null : index));
        onToggleAccordion?.(index, row);
    };
    return (_jsxs("div", { className: "flex flex-col gap-[30px]", children: [_jsx("div", { className: `shadow-[0_3px_4px_0_#00000008] ${tableContainerClass}`, children: _jsxs(ShadTable, { children: [_jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => (_jsx(TableRow, { className: cn("border-gray-300 bg-gray-100 hover:!bg-gray-100 rounded-xl", tbhRowClass), children: headerGroup.headers.map((header) => (_jsx(TableHead, { className: cn("text-dark text-sm capitalize font-bold", tHeadClass), children: header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext()) }, header.id))) }, headerGroup.id))) }), _jsx(TableBody, { children: loading ? (Array(5)
                                .fill(null)
                                .map((_, index) => (_jsx(React.Fragment, { children: table.getHeaderGroups().map((headerGroup) => (_jsx(TableRow, { className: cn("border-gray-300 hover:!bg-gray-100 rounded-xl"), children: headerGroup.headers.map((header) => {
                                        return (_jsx(TableCell, { children: _jsx(Skeleton, { className: "w-full h-6 rounded-lg" }) }, header.id));
                                    }) }, headerGroup.id))) }, index)))) : table?.getRowModel().rows?.length ? (table?.getRowModel().rows.map((row, i) => (_jsx(React.Fragment, { children: _jsx(TableRow, { onClick: () => toggleAccordion(i, row.original), "data-state": row.getIsSelected() && "selected", className: `border-gray-300 hover:!bg-gray-100 data-[state=selected]:bg-gray-100 ${bodyRowClass} `, children: row.getVisibleCells().map((cell, index) => (_jsx(TableCell, { className: cn("text-gray-500  text-sm font-bold", tbCellClass, index === 0 && firstCellClass, index === row.getVisibleCells().length - 1 &&
                                            lastCellClass), children: _jsxs("div", { className: "flex", children: [hasAccordion &&
                                                    showAccordionDropdown &&
                                                    index === 0 && (_jsx("div", { className: "cursor-pointer inline", children: _jsx("div", { className: `transform transition-transform duration-200 ${openRowIndex === i
                                                            ? "-rotate-90"
                                                            : "rotate-90"}`, children: icons.arrow }) })), " ", _jsx("div", { children: flexRender(cell.column.columnDef.cell, cell.getContext()) })] }) }, cell.id))) }, row.id) }, row.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center hover:bg-gray-100", children: emptyData ? (_jsx(ItemEmpty, { props: emptyProps })) : ("No results found.") }) })) })] }) }), showPaginate && (_jsx(PaginationComponent, { showBulkActions: showBulkActions, meta: meta }))] }));
}
//# sourceMappingURL=Table.js.map
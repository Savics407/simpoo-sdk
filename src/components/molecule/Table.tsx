import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";
import PaginationComponent, { Meta } from "./pagination-component";
import { icons } from "../../assets/icons";
import ItemEmpty, { Emptyprops } from "./ItemEmpty";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tbhRowClass?: string;
  tHeadClass?: string;
  tbCellClass?: string;
  meta?: Meta;
  showBulkActions?: boolean;
  showPaginate?: boolean;
  emptyData?: boolean;
  emptyProps?: Emptyprops;
  loading?: boolean;
  //   actions?: Action[];
  //   moreOptions?: DropDownOption[];
  hasAccordion?: boolean;
  accordionData?: (row: TData) => ReactNode;
  bodyRowClass?: string;
  tableContainerClass?: string;
  firstCellClass?: string;
  lastCellClass?: string;
  showAccordionDropdown?: boolean;
  onToggleAccordion?: (index: number, row: TData) => void;
}

export function Table<TData, TValue>({
  columns,
  data,
  tbhRowClass,
  tHeadClass,
  tbCellClass,
  meta,
  showBulkActions,
  showPaginate = true,
  emptyData,
  emptyProps,
  loading,
  //   actions,
  //   moreOptions,
  accordionData,
  hasAccordion,
  bodyRowClass,
  tableContainerClass,
  firstCellClass,
  lastCellClass,
  showAccordionDropdown = true,
  onToggleAccordion,
}: DataTableProps<TData, TValue>) {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);

  // const [rowSelection, setRowSelection] = useState<any>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // onRowSelectionChange: setRowSelection,
  });

  const toggleAccordion = (index: number, row: TData) => {
    setOpenRowIndex((prev) => (prev === index ? null : index));
    onToggleAccordion?.(index, row);
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <div className={`shadow-[0_3px_4px_0_#00000008] ${tableContainerClass}`}>
        <ShadTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn(
                  "border-gray-300 bg-gray-100 hover:!bg-gray-100 rounded-xl",
                  tbhRowClass
                )}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "text-dark text-sm capitalize font-bold",
                        tHeadClass
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(5)
                .fill(null)
                .map((_, index) => (
                  <>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow
                        key={headerGroup.id}
                        className={cn(
                          "border-gray-300 hover:!bg-gray-100 rounded-xl"
                        )}
                      >
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableCell key={header.id}>
                              <Skeleton className="w-full h-6 rounded-lg" />
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </>
                ))
            ) : (
              <>
                {table?.getRowModel().rows?.length ? (
                  table?.getRowModel().rows.map((row, i) => (
                    <>
                      <TableRow
                        onClick={() => toggleAccordion(i, row.original)}
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className={`border-gray-300 hover:!bg-gray-100 data-[state=selected]:bg-gray-100 ${bodyRowClass} `}
                      >
                        {row.getVisibleCells().map((cell, index) => (
                          <>
                            <TableCell
                              key={cell.id}
                              className={cn(
                                "text-gray-500  text-sm font-bold",
                                tbCellClass,
                                index === 0 && firstCellClass,
                                index === row.getVisibleCells().length - 1 &&
                                  lastCellClass
                              )}
                            >
                              <div className="flex">
                                {hasAccordion &&
                                  showAccordionDropdown &&
                                  index === 0 && (
                                    <div className="cursor-pointer inline">
                                      <div
                                        className={`transform transition-transform duration-200 ${
                                          openRowIndex === i
                                            ? "-rotate-90"
                                            : "rotate-90"
                                        }`}
                                      >
                                        {icons.arrow}
                                      </div>
                                    </div>
                                  )}{" "}
                                <div>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </div>
                              </div>
                            </TableCell>
                          </>
                        ))}
                      </TableRow>
                      {/* {hasAccordion && (
                        <TableRow className="hover:bg-gray-50">
                          <TableCell colSpan={columns.length} className="p-0">
                            <Collapse isOpened={openRowIndex === i}>
                              <div className="p-4 bg-gray-50 rounded-xl mt-5">
                                {accordionData
                                  ? accordionData(row.original)
                                  : null}
                              </div>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      )} */}
                    </>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center hover:bg-gray-100"
                    >
                      {emptyData ? (
                        <ItemEmpty props={emptyProps} />
                      ) : (
                        "No results found."
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </ShadTable>
      </div>

      {showPaginate && (
        <PaginationComponent showBulkActions={showBulkActions} meta={meta} />
      )}

      {/* <SelectedAction
        selectedRows={table.getFilteredSelectedRowModel().rows}
        toggle={() => table.toggleAllPageRowsSelected(false)}
        actions={actions}
        moreOptions={moreOptions}
      /> */}
    </div>
  );
}

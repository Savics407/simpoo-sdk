import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Pagination from "@mui/material/Pagination";
import { cn } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { icons } from "../../assets/icons";
import { setCurrentPage, setPerview } from "../../store/reducers/appSlice";

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

function PaginationComponent({
  showBulkActions = true,
  meta,
}: {
  showBulkActions?: boolean;
  meta?: Meta;
}) {
  const dispatch = useDispatch();
  const { currentPage, perview } = useSelector((state: RootState) => state.app);
  const handleChange = (e: any, p: any) => {
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

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 flex-wrap",
        meta && meta?.total > 0 ? null : "hidden"
      )}
    >
      {showBulkActions ? (
        <div className="flex items-center gap-2.5 shrink-0">
          {/* <DropdownComponent
            options={bulkActions}
            className="flex flex-col gap-2.5 rounded-xl w-[210px] border-gray-200 py-2.5 shadow-[0_8px_14px_0_#0F2A510A]"
          >
            <button className="rounded-md h-9 w-[140px] flex items-center justify-between p-3 font-semibold text-xs text-gray-600 outline-none border border-gray-300 ">
              Bulk Actions <span className="rotate-90">{icons.arrow}</span>
            </button>
          </DropdownComponent> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md h-9  flex items-center justify-between p-3 font-semibold text-xs text-gray-600 outline-none border border-gray-300 gap-2.5 ">
                {perview}
                <span className="rotate-90">{icons.arrow}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="flex flex-col gap-2.5 rounded-xl border-gray-200 py-2.5"
            >
              {rowsPerPage.map((count, index) => (
                <DropdownMenuItem
                  key={index}
                  className={`capitalize focus:bg-primary_light rounded-md focus:text-primary font-semibold  text-sm cursor-pointer px-[15px] flex items-center gap-[5px] ${
                    perview === count
                      ? "bg-primary_light text-primary"
                      : "text-gray-700"
                  }  `}
                  onClick={() => dispatch(setPerview(count))}
                >
                  {count}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="font-normal text-gray-600 text-[15px]">
            Showing {meta?.from} - {meta?.to} of {meta?.total}
          </p>
        </div>
      ) : null}
      <Pagination
        count={meta?.last_page || 1}
        page={meta?.current_page ?? 1}
        shape="rounded"
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
}

export default PaginationComponent;

import React, { useState } from "react";
import { Meta } from "../../molecule/pagination-component";
import { icons } from "../../../assets/icons";
import { formatToCurrency } from "../../../store/actions/utility";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { cn } from "../../../lib/utils";
import Container from "../../atoms/container";
import { Skeleton } from "../../ui/skeleton";
import { Collapse } from "react-collapse";

interface Overview {
  default: string;
  result_array: {
    [key: string]: {
      pricegroup: string;
      total_profit: number;
      total_cost: number;
      total_selling_price: number;
    };
  };
  otherscount: {
    uuid: string;
    name: string;
    default: boolean;
  }[];
  unit_count: number;
}

function ItemsOverview({
  loading,
  data,
  meta,
}: {
  loading: boolean;
  data: Overview;
  meta: Meta;
}) {
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
      icon: (
        <div className="shrink-0 rounded-lg bg-[#EFF5FF] w-12 h-12 flex items-center justify-center border border-[#EDEEF1]">
          {icons.cube}
        </div>
      ),
    },
    {
      label: "Total Cost Price",
      count: formatToCurrency(data?.result_array?.Retail?.total_cost ?? 0),
      desc: "Takes into Account FIFO & LIFO ",
      icon: (
        <div className="shrink-0 rounded-lg bg-[#F9DFDD] w-12 h-12 flex items-center justify-center border border-[#EDEEF1]">
          {React.cloneElement(icons.price_tag, {
            fill: "#ED7400",
          })}
        </div>
      ),
    },
    {
      label: "Total Selling Price",
      count: formatToCurrency(sellingPrice.value),
      desc: (
        <p className="flex gap-2 items-center flex-wrap">
          Showing {sellingPrice.type} price{" "}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-lg h-8 flex items-center justify-between p-3 font-semibold text-xs text-gray-600 outline-none border border-gray-300 gap-2.5 capitalize bg-[#F9F9F9]">
                change
                <span className="rotate-90">{icons.arrow}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="flex flex-col gap-2.5 rounded-xl border-gray-200 py-2.5 w-[210px]"
            >
              {totalSellingPrice.map((value, dindex) => (
                <DropdownMenuItem
                  key={dindex}
                  className={cn(
                    `capitalize focus:bg-primary_light rounded-md focus:text-primary font-semibold  text-sm cursor-pointer px-[15px] flex items-center gap-[5px] 
                      
                       `,
                    value.type === sellingPrice.type
                      ? "bg-primary_light text-primary"
                      : null
                  )}
                  onClick={() =>
                    setSellingPrice((prevData) => ({
                      ...prevData,
                      value: value.value,
                      type: value.type,
                    }))
                  }
                >
                  {value.type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </p>
      ),
      icon: (
        <div className="shrink-0 rounded-lg bg-[#D8CDF4] w-12 h-12 flex items-center justify-center border border-[#EDEEF1]">
          {React.cloneElement(icons.price_tag, {
            fill: "#9747FF",
          })}
        </div>
      ),
    },
    {
      label: "Profit to be made",
      count: formatToCurrency(profit.value),
      desc: (
        <p className="flex gap-2 items-center flex-wrap">
          Showing {profit.type} price{" "}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-lg h-8 flex items-center justify-between p-3 font-semibold text-xs text-gray-600 outline-none border border-gray-300 gap-2.5 capitalize bg-[#F9F9F9]">
                change
                <span className="rotate-90">{icons.arrow}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="flex flex-col gap-2.5 rounded-xl border-gray-200 py-2.5 w-[210px]"
            >
              {profitToBeMade.map((value, dindex) => (
                <DropdownMenuItem
                  key={dindex}
                  className={cn(
                    `capitalize focus:bg-primary_light rounded-md focus:text-primary font-semibold  text-sm cursor-pointer px-[15px] flex items-center gap-[5px] 
                      
                       `,
                    value.type === profit.type
                      ? "bg-primary_light text-primary"
                      : null
                  )}
                  onClick={() =>
                    setProfit((prevData) => ({
                      ...prevData,
                      value: value.value,
                      type: value.type,
                    }))
                  }
                >
                  {value.type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </p>
      ),
      icon: (
        <div className="shrink-0 rounded-lg bg-[#C6E3D2] w-12 h-12 flex items-center justify-center border border-[#EDEEF1]">
          {React.cloneElement(icons.price_tag, {
            fill: "#378C5A",
          })}
        </div>
      ),
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container className="bg-[#F6F8FA] p-2.5 flex flex-col">
      <div className="flex justify-between">
        <h1 className="capitalize text-dark font-semibold text-lg">
          Items overview
        </h1>
        <button
          className="rounded-lg h-8 flex items-center justify-between p-3 font-semibold text-xs text-gray-600 outline-none border border-gray-300 gap-2.5 capitalize bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close" : "Open"}{" "}
          <span className="rotate-90">{icons.arrow}</span>
        </button>
      </div>
      <Collapse isOpened={isOpen}>
        <div className="flex flex-wrap gap-2.5 mt-3">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className={cn(
                "border rounded-xl border-[#E4E7EC] p-4 flex flex-col relative bg-right-bottom bg-no-repeat flex-auto",
                index === 0
                  ? "bg-[#E4EEFA] bg-[url('/assets/images/ecstacy1.svg')]"
                  : index === 1
                  ? "bg-[#FAEAE9] bg-[url('/assets/images/ecstacy2.svg')]"
                  : index === 2
                  ? "bg-[#EEE9FA] bg-[url('/assets/images/ecstacy3.svg')]"
                  : index === 3
                  ? "bg-[#EBF5EF] bg-[url('/assets/images/ecstacy4.svg')]"
                  : null
              )}
            >
              <div className="flex justify-between gap-1">
                <h1 className="text-dark text-sm font-medium">{kpi.label}</h1>
                <div className="shrink-0">{kpi.icon}</div>
              </div>

              <div className="flex flex-col gap-1">
                {loading ? (
                  <Skeleton className="w-28 h-6 rounded" />
                ) : (
                  <h1
                    className={cn(
                      "text-dark font-bold text-[29px] truncate",
                      index === kpis.length - 1 && profit.value < 0
                        ? "text-danger"
                        : null
                    )}
                    title={kpi.count}
                  >
                    {kpi.count}
                  </h1>
                )}

                <div className="text-gray-700 text-sm font-medium ">
                  {kpi.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Collapse>
    </Container>
  );
}

export default ItemsOverview;

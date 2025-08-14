import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Table } from "../../molecule/Table";
import { itemColumns } from "./item-column";
import { useSelector } from "react-redux";
import { useSDK } from "../../../context/SimpooProvider";
import placeholderImage from "../../../assets/images/placeholder-image.svg";
import Container from "../../atoms/container";
import ItemsOverview from "./items-overview";
import Tabs from "../../molecule/tabs";
import { Skeleton } from "../../ui/skeleton";
import Button from "../../atoms/button";
import SearchComponent from "../../atoms/search-component";
import { icons } from "../../../assets/icons";
import { useDebounce } from "use-debounce";
import { useFetchData } from "../../../api/queryHooks";
import CreateMuiltipleItems from "../../modals/items/create-multiple-items";
export const InventoryTable = () => {
  const [overviewData, setOverviewData] = React.useState();
  const { currentPage, perview } = useSelector((state) => state.app);
  const [currentTab, setCurrentTab] = useState("all");
  const [itemFilter, setItemFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue] = useDebounce(searchValue, 1000);
  const { apiKey } = useSDK();
  const { data: items, isFetching: loadingItems } = useFetchData(
    [
      "items",
      perview.toString(),
      currentPage?.toString(),
      currentTab,
      debouncedValue,
      apiKey,
    ],
    debouncedValue
      ? `/items/search?page=${currentPage}&paginate=${perview}&param=${debouncedValue}&for=${currentTab}&filter=all`
      : `/items?page=${currentPage}&paginate=${perview}&status=${currentTab}`,
    {
      enabled: !!apiKey,
    }
  );
  //  const { data: searchFilterData, isFetching: filterLoading } = useFetchData(
  //    ["searchFilter"],
  //    "/meta/item/search_filters",
  //    {
  //      enabled: !!apiKey,
  //    }
  //  );
  const itemsData = items?.data?.[0] || [];
  const tableData =
    itemsData?.data?.map((item) => {
      const getFirstImage = () => {
        if (item.images?.length > 0) {
          return item.images?.[0].image;
        }
        return placeholderImage;
      };
      return {
        item_description: item?.name,
        all_quantity: +item?.all_quantity,
        quantity: +item?.quantity,
        type: item?.item_type?.name,
        selling_price: +item?.selling_price,
        categories: item?.category || [],
        tags: item?.item_tags?.map((tag) => tag.name) || [],
        status: item?.status ? "published" : "draft",
        sku: item?.sku,
        item_image: getFirstImage(),
        barcode: item?.barcode,
        expired: item?.expired,
        expiring: item?.expiring,
        unit: item?.item_unit,
        uuid: item?.uuid,
        item_type_id: item?.item_type?.uuid,
        reorder_level: item?.reorder_level,
        fullData: item,
      };
    }) || [];
  const { data: counts, isFetching: loadingCounts } = useFetchData(
    ["items-tab"],
    `/outbound/items/count`,
    {
      enabled: !!apiKey,
    }
  );
  const tabCounts = counts?.data;
  const tabsData = [
    {
      label: "all",
      count: tabCounts?.all || 0,
      action: () => setCurrentTab("all"),
    },
    {
      label: "published",
      count: tabCounts?.published || 0,
      action: () => setCurrentTab("published"),
    },
    {
      label: "out of stock",
      count: tabCounts?.out_of_stock || 0,
      action: () => setCurrentTab("out_of_stock"),
    },
    {
      label: "draft",
      count: tabCounts?.draft || 0,
      action: () => setCurrentTab("draft"),
    },
    {
      label: "expiring",
      count: tabCounts?.expiring || 0,
      action: () => setCurrentTab("expiring"),
    },
    {
      label: "expired",
      count: tabCounts?.expired || 0,
      action: () => setCurrentTab("expired"),
    },
  ];
  const [multipleItems, setMultipleItems] = useState(false);
  return _jsxs(Container, {
    className: "px-4 py-6 flex flex-col gap-8",
    children: [
      _jsx(Tabs, { tabs: tabsData, loading: loadingItems }),
      _jsxs("div", {
        className: " flex items-center justify-between flex-wrap gap-4",
        children: [
          _jsxs("div", {
            className: "flex items-center gap-2.5",
            children: [
              _jsx(SearchComponent, {
                placeholder: "Search Item name, barcode or sku",
                value: searchValue,
                onChange: (e) => setSearchValue(e.target.value),
              }),
              loadingItems
                ? _jsx(Skeleton, { className: "w-20 h-6" })
                : _jsxs("p", {
                    className: "text-dark text-sm font-medium",
                    children: [
                      itemsData?.meta?.total ?? 0,
                      " ",
                      _jsx("span", {
                        className: "text-gray-700",
                        children: "Items",
                      }),
                    ],
                  }),
            ],
          }),
          _jsx("div", {
            className: "flex gap-4",
            children: _jsx(Button, {
              label: "Create New",
              left_addon: icons.plus_squared,
              className: "!font-medium !text-sm !h-12",
              onClick: () => setMultipleItems(true),
            }),
          }),
        ],
      }),
      _jsx(ItemsOverview, {
        loading: loadingItems,
        data: items?.data?.[1],
        meta: itemsData?.meta,
      }),
      _jsx(Table, {
        loading: loadingItems,
        columns: itemColumns,
        data: tableData,
        emptyData: tableData.length === 0,
        emptyProps: {
          header: "No item yet",
          subText: "Add new item to start managing your inventory.",
        },
        tHeadClass: "whitespace-nowrap",
        tbCellClass: "text-dark font-semibold",
        meta: itemsData?.meta,
      }),
      multipleItems
        ? _jsx(CreateMuiltipleItems, {
            isOpen: multipleItems,
            onClose: () => setMultipleItems(false),
          })
        : null,
    ],
  });
};
//# sourceMappingURL=InventoryTable.js.map

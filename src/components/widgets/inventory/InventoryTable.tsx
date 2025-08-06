import React, { useEffect, useState } from "react";
import { createApiClient } from "../../../api/client";
import { Table } from "../../molecule/Table";
import { itemColumns, Items } from "./item-column";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useSDK } from "../../../context/SimpooProvider";
import placeholderImage from "../../../assets/images/placeholder-image.svg";
import Container from "../../atoms/container";
import ItemsOverview from "./items-overview";
import Tabs from "../../molecule/tabs";
import Select from "../../atoms/simpoo-select";
import { Skeleton } from "../../ui/skeleton";
import Button from "../../atoms/button";
import SearchComponent from "../../atoms/search-component";
import { icons } from "../../../assets/icons";
import DropdownComponent from "../../atoms/dropdown-component";
import { useDebounce } from "use-debounce";
import { useFetchData } from "../../../api/queryHooks";

export const InventoryTable: React.FC = () => {
  const [overviewData, setOverviewData] = React.useState<any>();
  const { currentPage, perview } = useSelector((state: RootState) => state.app);
  const [currentTab, setCurrentTab] = useState<string>("all");
  const [itemFilter, setItemFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState<string>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedValue] = useDebounce(searchValue, 1000);
  const { apiKey } = useSDK();

  const { data: items, isFetching: loadingItems } = useFetchData(
    ["items", perview.toString(), currentPage?.toString(), currentTab],
    `/outbound/items?page=${currentPage}&paginate=${perview}&status=all`,
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

  const tableData: Items[] = itemsData.map((item: ItemData) => {
    const getFirstImage = () => {
      if (item.images?.length > 0) {
        return item.images[0].image;
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
  });

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

  return (
    <Container className="px-4 py-6 flex flex-col gap-8">
      <Tabs tabs={tabsData} loading={loadingItems} />
      <div className=" flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2.5">
          {/* <Select
            placeholder="select search key"
            value={searchFilter}
            onValueChange={setSearchFilter}
            showSearch={false}
            options={searchFilterData?.data?.map(
              (filter: { name: string; value: string }) => {
                return {
                  label: filter.name,
                  value: filter.value,
                };
              }
            )}
            loading={loadingItems}
          /> */}
          <SearchComponent
            placeholder={"Search Item name, barcode or sku"}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {loadingItems ? (
            <Skeleton className="w-20 h-6" />
          ) : (
            <p className="text-dark text-sm font-medium">
              {itemsData?.meta?.total ?? 0}{" "}
              <span className="text-gray-700">Items</span>
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <Button
            label="Filter"
            left_addon={React.cloneElement(icons.filter_edit, {
              fill: "#5E6278",
            } as any)}
            onClick={() => setItemFilter(true)}
            className="!font-medium !bg-gray-200 hover:!bg-gray-300 !text-gray-700 !text-sm !h-12"
          />

          <Button
            label="Create New"
            left_addon={icons.plus_squared}
            className="!font-medium !text-sm !h-12"
            onClick={() => alert("create new item")}
          />
        </div>
      </div>

      <ItemsOverview
        loading={loadingItems}
        data={items?.data?.[1]}
        meta={itemsData?.meta}
      />
      <Table
        loading={loadingItems}
        columns={itemColumns}
        data={tableData || []}
        emptyData={tableData.length === 0}
        emptyProps={{
          header: "No item yet",
          subText: "Add new item to start managing your inventory.",
        }}
        tHeadClass="whitespace-nowrap"
        tbCellClass="text-dark font-semibold"
        meta={itemsData?.meta}
        // actions={actions}
        // moreOptions={bulkActions}
      />
    </Container>
  );
};

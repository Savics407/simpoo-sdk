import React, { useEffect } from "react";
import { createApiClient } from "../../../api/client";
import { Table } from "../../molecule/Table";
import { itemColumns, Items } from "./item-column";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useSDK } from "../../../context/SimpooProvider";

export const InventoryTable: React.FC = () => {
  const { apiKey } = useSDK();
  const [items, setItems] = React.useState<ItemData[]>([]);
  const [meta, setMeta] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { currentPage, perview } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    const api = createApiClient(apiKey || "");

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await api.get(
          `/outbound/items?page=${currentPage}&paginate=${perview}&status=all`
        );

        if (
          response.status === 200 &&
          typeof response.data === "object" &&
          response.data !== null &&
          "status" in response.data &&
          (response.data as any).status === "success" &&
          "data" in response.data
        ) {
          const payload = (response.data as { data: any[]; [key: string]: any })
            .data?.[0];
          setItems(payload?.data || []);
          setMeta(payload?.meta || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        console.log("request completed.");
      }
    };

    if (apiKey) fetchData();
  }, [apiKey, perview, currentPage]);

  const tableData: Items[] = items.map((item: ItemData) => {
    const getFirstImage = () => {
      if (item.images?.length > 0) {
        return item.images[0].image;
      }
      return "./../../../assets/images/placeholder-image.svg";
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

  console.log(items, "items");

  return (
    <Table
      loading={loading}
      columns={itemColumns}
      data={tableData || []}
      emptyData={tableData.length === 0}
      emptyProps={{
        header: "No item yet",
        subText: "Add new item to start managing your inventory.",
      }}
      tHeadClass="whitespace-nowrap"
      tbCellClass="text-dark font-semibold"
      meta={meta}
      // actions={actions}
      // moreOptions={bulkActions}
    />
  );
};

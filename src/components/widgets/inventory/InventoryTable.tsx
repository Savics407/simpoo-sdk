import React, { useEffect } from "react";
import { createApiCLient } from "../../../api/client";
import { StoreProvider } from "../../../context/StoreProvider";
import { Table } from "../../molecule/Table";
import { itemColumns, Items } from "./item-column";

interface InventoryChartProps {
  apiKey: string;
}

export const InventoryTable: React.FC<InventoryChartProps> = ({ apiKey }) => {
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const api = createApiCLient(apiKey || "");
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          "/outbound/items?page=1&paginate=10&status=all"
        );
        if (
          typeof response?.status === "string" &&
          response.status === "success" &&
          Array.isArray(response.data)
        )
          setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (apiKey) fetchData();
  }, [apiKey]);

  const tableData: Items[] = data?.[0]?.data?.map((item: ItemData) => {
    const getFirstImage = () => {
      let image = "";
      const filtered = item.images.filter((item, index) => index === 0);
      filtered.map((item: { image: string }) => (image = item.image));
      return image;
    };

    return {
      item_description: item?.name,
      all_quantity: item?.all_quantity,
      quantity: item?.quantity,
      type: item?.item_type?.name,
      selling_price: item?.selling_price,
      categories: item?.category,
      tags: item?.item_tags?.map((tag) => tag.name),
      status: item?.status ? "published" : "draft",
      sku: item?.sku,
      item_image:
        item?.images?.length > 0
          ? getFirstImage()
          : "/assets/images/placeholder-image.svg",
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

  return (
    <StoreProvider>
      <div className="">
        <h3>Inventory Overview</h3>
        <p>
          {loading ? "IT'S LOADING" : null}{" "}
          {data.length ? `Items: ${data.length}` : "No Data"}
        </p>
        <Table
          loading={loading}
          columns={itemColumns}
          data={tableData ?? []}
          emptyData={data?.[0]?.data?.length === 0}
          emptyProps={{
            header: "No item yet",
            subText: "Add new item to start managing your inventory.",
          }}
          tHeadClass="whitespace-nowrap"
          tbCellClass="text-dark font-semibold"
          meta={data?.[0]?.meta}
          // actions={actions}
          // moreOptions={bulkActions}
        />
      </div>
    </StoreProvider>
  );
};

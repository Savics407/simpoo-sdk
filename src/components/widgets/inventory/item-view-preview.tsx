import React from "react";
import ImagePreviews from "./image-previews";
import {
  addCommasToNumber,
  formatToCurrency,
} from "../../../store/actions/utility";
import { Separator } from "../../ui/separator";

function ItemViewPreview({
  data,
  printLabel,
}: {
  data: ItemData;
  printLabel?: () => void;
}) {
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
  return (
    <div className="grid grid-cols-3 gap-6">
      <ImagePreviews images={data?.images?.map((image) => image.image)} />
      <div className="col-span-2 flex flex-col gap-9">
        <div className="flex gap-4 bg-primary_light p-2.5 rounded-md">
          <p className="text-gray-700 text-sm font-medium">
            Cost price:{" "}
            <span className="text-dark font-bold text-[15px]">
              {formatToCurrency(Number(data?.cost_price))}
            </span>
          </p>
          <p className="text-gray-700 text-sm font-medium">
            Selling price:{" "}
            {data?.duplicate_prices.map((price, index) => (
              <>
                <span
                  key={index}
                  className="text-dark font-bold text-[15px] px-2"
                >
                  {formatToCurrency(Number(price.selling_price))}
                </span>
                {index < data?.prices.length - 1 && "-"}
              </>
            ))}
          </p>
        </div>

        <div className="flex gap-2.5">
          <p className="text-gray-800 text-sm font-medium">
            In stock:{" "}
            <span className="text-dark font-bold text-[15px]">
              {addCommasToNumber(Number(data?.quantity))} {data?.item_unit}
            </span>
          </p>
          |
          <p className="text-gray-700 text-sm font-medium">
            Total sold:{" "}
            <span className="text-dark font-bold text-[15px]">
              {addCommasToNumber(data?.total_sold)} {data?.item_unit}
            </span>
          </p>
        </div>

        <div className="space-y-2.5">
          <h2 className="text-gray-800 text-sm font-bold">Description</h2>
          <p className="text-gray-800 font-normal text-sm">
            {data?.description ?? "No description..."}
          </p>
        </div>

        <div className="flex gap-5 items-center">
          {counts.map((count, index) => (
            <div key={index} className="flex gap-5 items-center">
              <div className="flex flex-col gap-2.5">
                <p className="text-dark font-medium text-sm first-letter:uppercase">
                  {count.tag}
                </p>
                <p className="text-primary">{count.value}</p>
              </div>
              {index < counts.length - 1 && (
                <Separator className="bg-[#7E8299] h-[30px] w-[1px]" />
              )}
            </div>
          ))}
        </div>

        {/* <div className="flex gap-5">
            
          <Button
            label="Print barcodes/Labels"
            className="capitalize bg-primary_light text-primary hover:bg-primary_light/90 h-12"
            onClick={printLabel}
          />
        </div> */}

        <div className="flex gap-2.5 items-center">
          <p className="text-gray-700 text-sm font-medium flex gap-2">
            Category:{" "}
            {data?.category.map((category, index) => (
              <span key={index} className="text-dark font-normal text-[15px]">
                {category.name}{" "}
              </span>
            ))}
          </p>

          <Separator className="bg-[#7E8299] h-[14px] w-[1px]" />
          <p className="text-gray-700 text-sm font-medium">
            Collection:{" "}
            {data?.item_tags.map((tag, index) => (
              <span key={index} className="text-dark font-normal text-[15px]">
                {tag.name}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemViewPreview;

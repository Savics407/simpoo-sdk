import moment from "moment";

import React, { useState } from "react";
import {
  addCommasToNumber,
  formatToCurrency,
} from "../../../store/actions/utility";
import Select from "../../atoms/simpoo-select";
import placeholder from "../../../assets/images/image-placeholder.png";
import { cn } from "../../../lib/utils";
import { Separator } from "../../ui/separator";
import { icons } from "../../../assets/icons";

function ItemViewOverview({ data }: { data: ItemData }) {
  const [sellingPrice, setSellingPrice] = useState(data?.total_selling_price);
  const itemKpi = [
    {
      label: "Stock Quantity",
      value: addCommasToNumber(Number(data?.quantity)),
      desc: null,
    },
    {
      label: "Total Cost",
      value: formatToCurrency(Number(data?.total_cost_price)),
      desc: null,
    },
    {
      label: "Total Selling Price",
      value: formatToCurrency(sellingPrice),
      desc: (
        <Select
          options={data?.prices?.map((price) => {
            return {
              label: price.priceGroup.name,
              value: price.selling_price.toString(),
            };
          })}
          onValueChange={(e) => setSellingPrice(Number(e))}
          value={sellingPrice.toString()}
          triggerClass="h-8"
          showSearch={false}
          placeholder="Select price"
        />
      ),
    },
    {
      label: "Profit to be made",
      value: formatToCurrency(sellingPrice - data?.total_cost_price),
      desc: null,
    },
  ];

  const itemCodes = [
    {
      tag: "Barcode",
      value: data?.barcode.map((code) => code.barcode),
    },
    {
      tag: "SKU",
      value: data?.sku,
    },

    {
      tag: "System code",
      value: data?.itemcode.toString(),
    },
  ];

  const supplierHeader = [
    "S/N",
    "Batch number",
    "Quantity",
    "Expiry date",
    "Unit cost",
  ];

  const tables = [
    {
      tag: "Extras",
      headers: [
        "S/N",
        "image",
        "extra name",
        "quantity inside ",
        "selling price",
      ],
      body: data?.extras?.map((extra, index) => (
        <tr key={index} className="text-dark text-sm">
          <td>{index + 1}</td>
          <td>
            <div className="w-9 h-9 shrink-0 relative">
              <img
                alt="item image"
                src={placeholder}
                className="object-cover w-full h-full"
              />
            </div>
          </td>
          <td>{extra.extra.name}</td>
          <td>
            {extra.quantity} {extra.extra.item_unit}
          </td>
          <td>{formatToCurrency(Number(extra.selling_price))}</td>
        </tr>
      )),
    },

    {
      tag: "Raw materials",
      headers: [
        "S/N",
        "image",
        "material name",
        "quantity inside ",
        "selling price",
      ],
      body: data?.material?.map((material, index) => (
        <tr key={index} className="text-dark text-sm">
          <td>{index + 1}</td>
          <td>
            <div className="w-9 h-9 shrink-0 relative">
              <img
                alt="item image"
                src={placeholder}
                className="object-cover w-full h-full"
              />
            </div>
          </td>
          <td>{material.raw_material?.name}</td>
          <td>
            {material.quantity} {material.raw_material?.item_unit}
          </td>
          <td>{formatToCurrency(Number(material.selling_price))}</td>
        </tr>
      )),
    },

    {
      tag: "Packing groups",
      headers: [
        "S/N",
        "image",
        "group name",
        "quantity inside ",
        "selling price",
        "Group code",
        "print label",
      ],
      body: data?.item_group?.map((group, index) => (
        <tr key={index} className="text-dark text-sm">
          <td>{index + 1}</td>
          <td>
            <div className="w-9 h-9 shrink-0 relative">
              <img
                alt="item image"
                src={placeholder}
                className="object-cover w-full h-full"
              />
            </div>
          </td>
          <td>{group.group_name}</td>
          <td>
            {group.quantity} {data.item_unit}
          </td>
          <td>{formatToCurrency(Number(group.selling_price))}</td>
          <td>{group.barcode}</td>
          <td>
            <button className="w-6 h-6 items-center flex justify-center">
              {icons.printer_blue}
            </button>
          </td>
        </tr>
      )),
    },

    {
      tag: "Variations",
      headers: [
        "S/N",
        "image",
        "variation",
        "quantity ",
        "selling price",
        "code",
        "print label",
      ],
      body: data?.variation?.map((body, index) => (
        <tr key={index} className="text-dark text-sm">
          <td>{index + 1}</td>
          <td>
            <div className="w-9 h-9 shrink-0 relative">
              <img
                alt="item image"
                src={body.image ?? placeholder}
                className="object-cover w-full h-full"
              />
            </div>
          </td>
          <td>
            {body.variation_values.map((values, index) => (
              <span key={index} className="pr-2">
                {values.attribute_value.value_name}{" "}
                {body.variation_values.length - 1 > index && "-"}
              </span>
            ))}
          </td>
          <td>
            {body.quantity}
            {data?.item_unit}
          </td>
          <td>
            {formatToCurrency(Number(body.locationprices?.[0]?.selling_price))}
          </td>
          <td>{body.barcode}</td>
          <td>
            <button className="w-6 h-6 items-center flex justify-center">
              {icons.printer_blue}
            </button>
          </td>
        </tr>
      )),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-2.5">
        {itemKpi.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl border-gray-200 p-4 gap-4 flex flex-col"
          >
            <p className="text-dark text-sm font-medium">{item.label}</p>
            <p
              title={item.value}
              className={cn(
                "text-dark font-bold text-3xl truncate",
                index === itemKpi.length - 1 &&
                  Number(sellingPrice) - Number(data?.cost_price) < 0
                  ? "text-danger"
                  : null
              )}
            >
              {item.value}
              {index === 0 && (
                <span className="font-normal text-sm">{data.item_unit}</span>
              )}
            </p>
            {item.desc}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-10 space-y-6">
          <div className="space-y-3">
            <p className="border-b border-gray-300 pb-2.5 text-gray-800 font-semibold ">
              Item codes:
            </p>

            <div className="flex gap-5">
              {itemCodes.map(
                (code: { tag: string; value: string | string[] }, index) => (
                  <>
                    <div key={index} className={cn("flex flex-col gap-2.5")}>
                      <p className="text-dark text-sm font-medium">
                        {code.tag}
                      </p>
                      <p className="text-gray-500 text-sm font-normal flex flex-col gap-2">
                        {Array.isArray(code.value)
                          ? code.value?.map((value, index) => (
                              <span key={index}>{value}</span>
                            ))
                          : code.value}
                      </p>
                    </div>
                    {index < itemCodes.length - 1 && (
                      <div key={index}>
                        <Separator
                          orientation="vertical"
                          className="bg-[#7E8299]"
                        />
                      </div>
                    )}
                  </>
                )
              )}
            </div>
          </div>

          <div className="space-y-3">
            <p className="border-b border-gray-300 pb-2.5 text-gray-800 font-semibold ">
              Suppliers:
            </p>

            <div className="flex gap-5 flex-col">
              {data?.suppliers?.map((supplier, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-xl p-[15px] space-y-[18px]"
                >
                  <div className="flex gap-3">
                    <div className="w-9 h-9 shrink-0 relative">
                      <img
                        alt="item image"
                        src={placeholder}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="space-y-1 flex-grow border-b border-dashed border-gray-300 pb-1">
                      <h1 className="text-dark font-semibold text-sm capitalize">
                        {supplier.name}
                      </h1>
                      <p className="text-gray-700 font-medium text-[13px] capitalize">
                        {/* Nigeria | {supplier.phone} */}
                      </p>
                    </div>
                  </div>

                  <table className="table-auto w-full border-separate border-spacing-y-3">
                    <thead>
                      <tr>
                        {supplierHeader.map((header, index) => (
                          <th key={index} className="text-left text-dark">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-dark text-sm">
                        <td>1</td>
                        <td>
                          <div className="w-9 h-9 shrink-0 relative">
                            {supplier.supplier_batch_number}
                          </div>
                        </td>
                        <td>{supplier.supplier_quantity}</td>
                        <td>
                          {moment(supplier.supplier_expired_date).format(
                            "MMMM DD, YYYY"
                          )}
                        </td>
                        <td>
                          {formatToCurrency(Number(supplier.supplier_price))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>

          {tables.map((table, index) => (
            <div key={index} className="space-y-3">
              <p className="border-b border-gray-300 pb-2.5 text-gray-800 font-semibold ">
                {table.tag}: {table.body.length}
              </p>
              {table.body.length > 0 ? (
                <div className="bg-gray-100 rounded-xl p-[15px] space-y-[18px]">
                  <table className="table-auto w-full border-separate border-spacing-y-3">
                    <thead>
                      <tr>
                        {table.headers.map((header, index) => (
                          <th
                            key={index}
                            className="text-left text-dark first-letter:uppercase"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>{table.body}</tbody>
                  </table>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemViewOverview;

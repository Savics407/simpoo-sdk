import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { RootState } from "../../../store";
import { cn } from "../../../lib/utils";
import {
  addCommasToNumber,
  formatToCurrency,
} from "../../../store/actions/utility";
import InfoCard from "../../atoms/InfoCard";
import StatusComponent from "../../atoms/status-component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { icons } from "../../../assets/icons";
import ItemView from "../../modals/items/item-view";
import DeleteItem from "../../modals/items/delete-item";

export type Items = {
  item_description: string;
  all_quantity: number;
  quantity: number;
  type: string;
  selling_price: number;
  categories: Array<any>;
  tags: string[];
  status: string;
  sku: string;
  item_image: string;
  barcode: Array<any>;
  expired: number;
  expiring: number;
  unit: string;
  uuid: string;
  item_type_id: string;
  reorder_level: string;
  fullData: ItemData;
};

export const itemColumns: ColumnDef<Items>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //         className="!border-gray-600 h-6 w-6 rounded-[7px] data-[state=checked]:bg-primary data-[state=checked]:border-none"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="select row"
  //         className="!border-gray-600 h-6 w-6 rounded-[7px] data-[state=checked]:bg-primary data-[state=checked]:border-none"
  //       />
  //     ),
  //   },
  {
    accessorKey: "item_description",
    header: "item description",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center gap-5">
          <div className="w-[50px] h-[50px] rounded-2xl relative bg-gray-100">
            <img
              src={item.item_image}
              alt="item image"
              className="rounded-2xl object-cover w-full h-full"
              draggable={false}
            />
          </div>
          <div className="space-y-1 max-w-[265px]">
            <Title
              title={item.item_description}
              item_uuid={item.uuid}
              item_type_id={item.item_type_id}
              data={item.fullData}
            />
            <p className="text-dark text-xs font-normal flex items-center gap-1">
              <span className="uppercase whitespace-nowrap">{item.sku}</span>
              {item.barcode?.length > 0 ? (
                <>
                  <span>|</span>
                  {item.barcode?.[0]?.barcode}

                  {item.barcode.length > 1 ? (
                    <span className="rounded bg-[#9747FF1A] px-[5px] flex items-center text-[#7239EA] font-semibold text-[11px] h-[18px]">
                      +{item.barcode?.length - 1}
                    </span>
                  ) : null}
                </>
              ) : null}

              {item.expired ? (
                <>
                  <span>|</span>
                  Expired
                  <span className="rounded bg-danger_light px-[5px] flex items-center text-danger font-semibold text-[11px] h-[18px]">
                    {item.expired}
                  </span>
                </>
              ) : null}

              {item.expiring ? (
                <>
                  <span>|</span>
                  Expiring
                  <span className="rounded bg-warning-light px-[5px] flex items-center text-warning font-semibold text-[11px] h-[18px]">
                    {item.expiring}
                  </span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <p>quantity</p>,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <>
          <div
            className={cn(
              "flex items-center",
              item.quantity <= 0
                ? "text-danger"
                : Number(item.reorder_level) == item.quantity
                ? "text-orange"
                : null
            )}
          >
            {/* <InlineUpdate
              label="Edit item quantity"
              placeholder="Enter quantity"
              uuid={item.uuid}
              name="item_quantity"
              displayValue={addCommasToNumber(item.quantity) + item.unit}
              value={item.quantity}
              valueType="number"
            /> */}
            <p>{addCommasToNumber(item.quantity) + item.unit}</p>
          </div>
          {item.all_quantity === item.quantity ? null : (
            <p className="text-gray-700">
              {Intl.NumberFormat().format(item.all_quantity ?? 0) + item.unit}
            </p>
          )}
        </>
      );
    },
  },

  {
    accessorKey: "type",
    // header: "decimal",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="capitalize">{item.type}</p>;
    },
  },
  {
    accessorKey: "selling_price",
    header: "Selling Price (₦)",
    cell: ({ row }) => {
      const item = row.original;
      return (
        // <InlineUpdate
        //   label="Edit selling price (₦)"
        //   placeholder="Enter selling price"
        //   uuid={item.uuid}
        //   name="selling_price"
        //   displayValue={formatToCurrency(item.selling_price ?? 0)}
        //   value={item.selling_price ?? 0}
        //   valueType="number"
        // />
        <p>{formatToCurrency(item.selling_price ?? 0)}</p>
      );
    },
  },
  {
    accessorKey: "categories",
    header: "categories/Tags",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <>
          {" "}
          <div className="flex items-center gap-2 capitalize">
            {item.categories && item.categories?.length > 0
              ? item.categories?.[0]?.name
              : "..."}

            {item.categories.length > 1 ? (
              <InfoCard
                align="center"
                fieldName={"Categories"}
                trigger={
                  <button className="rounded bg-[#9747FF1A] px-[5px] flex items-center text-[#7239EA] font-semibold text-[11px] h-[18px]">
                    +{item.categories.length - 1}
                  </button>
                }
              >
                <ul className="list-disc pl-4">
                  {item.categories.map((category, index) => (
                    <li key={index}>{category.name}</li>
                  ))}
                </ul>
              </InfoCard>
            ) : null}
          </div>
          <div className="text-gray-700 flex items-center gap-2 capitalize">
            {item.tags?.[0]}

            {item.tags?.length > 1 ? (
              <InfoCard
                align="center"
                fieldName={"Tags"}
                trigger={
                  <button className="rounded bg-[#9747FF1A] px-[5px] flex items-center text-[#7239EA] font-semibold text-[11px] h-[18px] border-primary">
                    +{item.tags.length - 1}
                  </button>
                }
              >
                <ul className="list-disc pl-4">
                  {item.tags.map((tags, index) => (
                    <li key={index}>{tags}</li>
                  ))}
                </ul>
              </InfoCard>
            ) : null}
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return <StatusComponent status={status as string} />;
    },
  },
  {
    id: "actions",
    header: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropDown
          item_uuid={item.uuid}
          item_type_id={item.item_type_id}
          data={item.fullData}
        />
      );
    },
  },
];

const DropDown = ({
  item_uuid,
  item_type_id,
  data,
}: {
  item_uuid: string;
  item_type_id: string;
  data: ItemData;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // let hoveredIndex: any = null;
  const handleHover = (index: any) => {
    setHoveredIndex(index);
    // hoveredIndex = index;
  };
  const handleMouseOut = () => {
    setHoveredIndex(null);
    // hoveredIndex = null;
  };

  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [label, setLabel] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [duplicateItem, setDuplicateItem] = useState(false);
  const [deactivateItem, setDeactivateItem] = useState(false);
  const [updateDiscount, setUpdateDiscount] = useState(false);

  const toggleViewAndEdit = () => {
    setView(false);
    setEdit(true);
  };

  const actionMenu = [
    {
      label: "view",
      icon: icons.eye_outline,
      action: () => setView(true),
    },
    {
      label: "delete",
      icon: icons.trash,
      action: () => setDeleteItem(true),
    },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="bg-gray-100 rounded-md h-[30px] w-[90px] flex items-center justify-between p-2.5 font-semibold text-[10px] text-gray-500 hover:border duration-200">
            Action{" "}
            <svg
              width="11"
              height="6"
              viewBox="0 0 11 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.50855 5.49304C5.42081 5.49355 5.33383 5.47673 5.25261 5.44356C5.17138 5.41038 5.09751 5.3615 5.03521 5.29971L1.03521 1.29971C0.972726 1.23773 0.92313 1.164 0.889284 1.08276C0.855438 1.00152 0.838013 0.914383 0.838013 0.826375C0.838013 0.738367 0.855438 0.65123 0.889284 0.56999C0.92313 0.488751 0.972726 0.415017 1.03521 0.353041C1.16012 0.228874 1.32909 0.15918 1.50521 0.15918C1.68134 0.15918 1.8503 0.228874 1.97521 0.353041L5.50855 3.88637L9.03521 0.353041C9.16012 0.228874 9.32909 0.15918 9.50521 0.15918C9.68134 0.15918 9.8503 0.228874 9.97521 0.353041C10.0377 0.415017 10.0873 0.488751 10.1211 0.56999C10.155 0.65123 10.1724 0.738367 10.1724 0.826375C10.1724 0.914383 10.155 1.00152 10.1211 1.08276C10.0873 1.164 10.0377 1.23773 9.97521 1.29971L5.97521 5.29971C5.85104 5.42287 5.68344 5.4923 5.50855 5.49304Z"
                fill="#202125"
              />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="flex flex-col gap-2.5 rounded-xl  border-gray-200"
        >
          {actionMenu.map((action, index) => (
            <DropdownMenuItem
              key={index}
              className={`capitalize focus:bg-primary_light rounded-md focus:text-primary font-semibold text-gray-700 text-sm cursor-pointer px-[15px] flex items-center gap-[5px] ${
                index === actionMenu.length - 1 &&
                "text-danger  focus:text-danger"
              }`}
              onMouseOver={() => handleHover(index)}
              onMouseOut={handleMouseOut}
              onClick={action.action}
            >
              {React.cloneElement(action.icon, {
                fill: hoveredIndex === index ? "#1868DB" : "#5E6278",
              })}{" "}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <ItemView
        isOpen={view}
        onClose={() => setView(false)}
        itemUUID={item_uuid}
      />

      <DeleteItem
        isOpen={deleteItem}
        onClose={() => setDeleteItem(false)}
        uuids={[item_uuid]}
        single
      />
    </>
  );
};

const Title = ({
  title,
  item_uuid,
  item_type_id,
  data,
}: {
  title: string;
  item_uuid: string;
  item_type_id: string;
  data: ItemData;
}) => {
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [label, setLabel] = useState(false);

  const toggleViewAndEdit = () => {
    setView(false);
    setEdit(true);
  };

  return (
    <>
      <button
        className={cn(
          `text-primary font-bold text-sm first-letter:uppercase truncate max-w-[265px] cursor-pointer`,
          data.expired ? "text-danger" : ""
        )}
        title={title}
        onClick={() => setView(true)}
      >
        {title}
      </button>

      <ItemView
        isOpen={view}
        onClose={() => setView(false)}
        itemUUID={item_uuid}
      />

      {/* <EditItem
        itemUUID={item_uuid}
        itemTypeUUID={item_type_id}
        isOpen={edit}
        onClose={() => setEdit(false)}
      />
      

      <PrintLabel
        isOpen={label}
        onClose={() => setLabel(false)}
        uuids={[item_uuid]}
        data={[data]}
      /> */}
    </>
  );
};

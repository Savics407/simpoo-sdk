import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { RootState } from "../../store";
import { useFetchData, usePostData } from "../../api/queryHooks";
import { useSelector } from "react-redux";
import ModalLayout from "../layouts/modal-layout";
import Select from "../atoms/simpoo-select";
import { CategorySelector } from "../atoms/category-selection";
import { MultipleSelector } from "../atoms/multiSelect";
import Input from "../atoms/input";
import Button from "../atoms/button";
import { icons } from "../../assets/icons";
import { useSDK } from "../../context/SimpooProvider";

function CreateMuiltipleItems({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) {
  const { mutate, isPending } = usePostData();
  const queryClient = useQueryClient();
  const { apiKey } = useSDK();

  const { data: categories } = useFetchData(
    [`categories`],
    `/outbound/inventory_metas/categories`,
    {
      enabled: !!apiKey,
    }
  );

  const { data: itemUnits } = useFetchData(
    [`itemunits`],
    `/outbound/inventory_metas/units`,
    {
      enabled: !!apiKey,
    }
  );

  const { data: itemTags } = useFetchData(
    [`itemtags`],
    `/outbound/inventory_metas/tags`,
    {
      enabled: !!apiKey,
    }
  );

  const { data: itemTypes } = useFetchData(
    [`itemtypes`],
    `/outbound/inventory_metas/types`,
    {
      enabled: !!apiKey,
    }
  );

  const category =
    categories?.data?.data?.map((category: ItemCategory) => {
      return {
        label: category.name,
        value: category.uuid,
        subOptions: category.subCategories.map((sub) => {
          return {
            label: sub.name,
            value: sub.uuid,
          };
        }),
      };
    }) || [];

  const itemUnit =
    itemUnits?.data?.data?.map((unit: ItemUnit) => {
      return {
        label: unit.name,
        value: unit.uuid,
      };
    }) || [];

  const itemTag = itemTags?.data?.data?.map(
    (unit: { name: string; uuid: string }) => {
      return {
        label: unit.name,
        value: unit.uuid,
      };
    }
  );

  const itemTypesList =
    itemTypes?.data?.data
      ?.filter(
        (type: ItemType) => type.name === "products" || type.name === "services"
      )
      .map((type: ItemType) => {
        return {
          label: type.name,
          value: type.uuid,
        };
      }) || [];

  const [selectedTypeName, setSelectedTypeName] = useState("");

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  const [selectedTypes, setSelectedTypes] = useState<string>(
    itemTypesList[0]?.value || ""
  );

  useEffect(() => {
    const label =
      itemTypesList.find((type: any) => type?.value === selectedTypes)?.label ||
      "";

    setSelectedTypeName(label);
  }, [selectedTypes]);

  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  // const [names, setNames] = useState<Array<string>>([]);
  const [items, setItems] = useState<
    {
      name: string;
      itemunit_id: string;
      quantity: string;
      cost_price: string;
      selling_price: string;
      barcode: string;
    }[]
  >([
    {
      name: "",
      itemunit_id: itemUnit[0]?.value || "",
      quantity: "",
      cost_price: "",
      selling_price: "",
      barcode: "",
    },
  ]);

  const updateItemFields = (
    name: string,
    value: string | number,
    index: number
  ) => {
    const updatedItemFields = [...items];
    updatedItemFields[index] = {
      ...updatedItemFields[index],
      [name]: value,
    };
    setItems(updatedItemFields);
  };

  const addField = () => {
    setItems((prev) => [
      ...prev,
      {
        name: "",
        itemunit_id: itemUnit[0]?.value || "",
        quantity: "",
        cost_price: "",
        selling_price: "",
        barcode: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, id) => id !== index);
    setItems(updatedItems);
  };

  const storeMultiple = {
    itemtype_id: selectedTypes,
    itemcategory_id: selectedCategories,
    tags: selectedTag,
    items: items,
  };

  const createMultipleItems = () => {
    mutate(
      {
        url: "/outbound/items/create_multiple",
        payload: storeMultiple,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["items"] });
          onClose && onClose();
        },
      }
    );
  };

  const tableHead = [
    "Item name",
    "Item unit",
    ...(selectedTypeName !== "services" ? ["Quantity", "Barcode"] : []),
    "Cost price (₦)",
    "Selling price (₦)",
  ];

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Quick create multiple items"
      className="max-w-[1024px]"
    >
      <div className="px-5 space-y-7 pb-5">
        {/* <div className="rounded-md py-4 px-3.5 bg-primary_light flex items-center gap-4">
          {icons.info}
          <p className="text-dark text-sm font-medium">
            Type item names and separate them with comma.
          </p>
        </div> */}
        {/* <TagInput label="Item names" setTagArray={setNames} required /> */}
        <div className="grid grid-cols-3 gap-5 bg-gray-100 rounded-xl p-4">
          <Select
            label="Item type"
            options={itemTypesList}
            placeholder="select item type"
            value={selectedTypes}
            onValueChange={(value) => setSelectedTypes(value)}
            required
            info="Select the type of item you're creating (e.g., product, service, variations, kits ). This classification helps determine how the item is managed, displayed, or fulfilled."
          />

          <CategorySelector
            placeholder="select categories"
            label="Category"
            options={category}
            values={selectedCategories}
            onChange={(values) => setSelectedCategories(values)}
            showMultiSelectValues={false}
            showCount
            info="Select the category that best describes this item(s) (e.g., electronics, clothing, food). Categorizing items helps in organizing inventory and simplifies product management."
          />

          <MultipleSelector
            label="Item tag"
            placeholder="Select item tags"
            info="Enter relevant keywords or labels for this item(s). Tags help in categorizing and making the item easier to find through search filters."
            labelClass="text-dark text-sm"
            options={itemTag}
            values={selectedTag}
            onChange={setSelectedTag}
            showSearch
            showCount
            showMultiSelectValues={false}
          />
        </div>

        <div className="space-y-2 overflow-auto">
          <table className="table-auto w-full border-separate border-spacing-4">
            <thead>
              <tr>
                {tableHead.map((head, index) => (
                  <th
                    key={index}
                    className="text-dark text-sm font-medium text-left"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-dark text-[15px] ">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="">
                    <Input
                      type="text"
                      placeholder="Enter item name"
                      value={item.name}
                      onChange={(e) =>
                        updateItemFields("name", e.target.value, index)
                      }
                    />
                  </td>

                  <td>
                    <Select
                      options={itemUnit}
                      placeholder="select item unit"
                      value={item.itemunit_id}
                      onValueChange={(value) =>
                        updateItemFields("itemunit_id", value, index)
                      }
                    />
                  </td>

                  {selectedTypeName !== "services" ? (
                    <>
                      <td className="">
                        <Input
                          type="number"
                          placeholder="0"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItemFields("quantity", e.target.value, index)
                          }
                        />
                      </td>

                      <td className="">
                        <Input
                          type="number"
                          placeholder="Enter barcode"
                          value={item.barcode}
                          onChange={(e) =>
                            updateItemFields("barcode", e.target.value, index)
                          }
                        />
                      </td>
                    </>
                  ) : null}

                  <td className="">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={item.cost_price}
                      onChange={(e) =>
                        updateItemFields("cost_price", e.target.value, index)
                      }
                    />
                  </td>

                  <td className="">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={item.selling_price}
                      onChange={(e) =>
                        updateItemFields("selling_price", e.target.value, index)
                      }
                    />
                  </td>

                  <td className="">
                    <button
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {icons.trash2}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            mode={"text"}
            label={"Add more"}
            left_addon={icons.plus_squared2}
            onClick={addField}
            className="font-medium text-sm ml-4"
          />
        </div>
      </div>

      <div className="flex justify-between items-center px-5 sticky bottom-0 bg-white py-5 border-t">
        <button className="text-primary text-sm font-medium flex items-center gap-1">
          {icons.question} Need help?
        </button>
        <div className="flex justify-end gap-2.5">
          <Button
            label="Cancel"
            className="bg-[#F1F1F2] text-[#181C32] hover:bg-[#F1F1F2]/90"
            onClick={onClose}
          />
          <Button
            label="Create Items"
            onClick={createMultipleItems}
            loading={isPending}
          />
        </div>
      </div>
    </ModalLayout>
  );
}

export default CreateMuiltipleItems;

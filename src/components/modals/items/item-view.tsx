import React, { useEffect, useState } from "react";
import { useFetchData } from "../../../api/queryHooks";
import moment from "moment";
import SideViewModalLayout from "../../layouts/side-view-modal-layout";
import ItemViewLoader from "../../molecule/item-view-loader";
import Button from "../../atoms/button";
import ItemViewPreview from "../../widgets/inventory/item-view-preview";
import ItemViewOverview from "../../widgets/inventory/item-view-overview";
import Tabs from "../../molecule/tabs";

function ItemView({
  isOpen,
  onClose,
  itemUUID,
}: {
  isOpen: boolean;
  onClose?: () => void;
  itemUUID: string;
}) {
  const { data, isFetching } = useFetchData(
    ["single_item", itemUUID],
    `/items/get?item_uuid=${itemUUID}`,
    {
      enabled: isOpen,
    }
  );

  const itemData: ItemData = data?.data;

  const moreOptions = [
    {
      label: "more items list here",
      action: () => alert(true),
    },
  ];

  const itemMeta = [
    {
      tag: "Created",
      value: moment(itemData?.created_date).format("MMMM DD, YYYY"),
    },
    {
      tag: "Last edited",
      value: moment(itemData?.last_update_date).format("MMMM DD, YYYY"),
    },
    {
      tag: "Expiry",
      value: (
        <p className="">
          {" "}
          <span className="text-danger">{itemData?.expired} Expired,</span>{" "}
          <span className="text-warning">{itemData?.expiring} Expiring</span>
        </p>
      ),
    },
  ];

  const [currentTab, setCurrentTab] = useState<number>(1);
  const tabs = [
    {
      label: "Item overview",
      action: () => setCurrentTab(1),
    },
    // {
    //   label: "Item statement",
    //   action: () => setCurrentTab(2),
    // },

    // {
    //   label: "Item trail",
    //   action: () => setCurrentTab(3),
    // },
  ];

  useEffect(() => {
    !isOpen && setCurrentTab(1);
  }, [isOpen]);

  return (
    <SideViewModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Item View"
      className="w-[1176px]"
    >
      {isFetching ? (
        <ItemViewLoader />
      ) : (
        <div className="space-y-7">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-dark text-xl font-semibold flex items-center gap-2">
                {itemData?.name}
                <span className="bg-primary_light text-primary text-xs rounded px-[7px] h-5 flex items-center capitalize">
                  {itemData?.item_type?.name}
                </span>
              </h1>
              <div className="flex gap-2">
                {itemMeta.map((meta, index) => (
                  <p
                    key={index}
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <span className="text-dark">{meta.tag}:</span> {meta.value}{" "}
                    {index < 2 && "|"}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              {/* <Button
                left_addon={icons.pen_black}
                label={"Edit item"}
                className="text-gray-700 bg-gray-200 hover:bg-gray-200/90"
                onClick={editItem}
              /> */}

              {/* <DropdownComponent options={moreOptions}>
                <button className="font-medium text-gray-700 text-sm h-9 bg-transparent hover:bg-transparent border border-gray-300 flex items-center gap-1.5 px-3 rounded-md outline-none">
                  More options{" "}
                  <span className="rotate-90">
                    {React.cloneElement(icons.arrow2, {
                      fill: "#5E6278",
                    } as any)}
                  </span>
                </button>
              </DropdownComponent> */}
            </div>
          </div>
          <ItemViewPreview data={itemData} />

          <Tabs tabs={tabs} />
          {currentTab === 1 ? <ItemViewOverview data={itemData} /> : null}
        </div>
      )}
    </SideViewModalLayout>
  );
}

export default ItemView;

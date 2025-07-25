import React from "react";

export interface Emptyprops {
  header?: string;
  subText?: string;
  icon?: string;
}

function ItemEmpty({ props = {} }: { props?: Emptyprops }) {
  return (
    <div className="flex flex-col gap-3 items-center py-24">
      {/* <Image
        src={props.icon ?? "/assets/icons/empty-items-icon.svg"}
        width={74}
        height={65}
        alt={"empty image"}
        draggable={false}
      /> */}
      <p className="font-bold text-sm">{props.header ?? "No item attached"}</p>
      <p className="font-bold text-[13px] text-gray-700">
        {props.subText ?? "Add a new item to start managing your orders."}
      </p>
    </div>
  );
}

export default ItemEmpty;

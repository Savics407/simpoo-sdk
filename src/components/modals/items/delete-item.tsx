"use client";

import React, { useState } from "react";
import ModalLayout from "../../layouts/modal-layout";
import { Separator } from "../../ui/separator";
import Button from "../../atoms/button";
import { useQueryClient } from "@tanstack/react-query";
import { usePostData } from "../../../api/queryHooks";
import { icons } from "../../../assets/icons";

function DeleteItem({
  isOpen,
  onClose,
  uuids,
  single = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  uuids: string[];
  single?: boolean;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePostData();
  const deleteItem = () => {
    mutate(
      {
        url: "/items/delete",
        payload: {
          item_uuids: uuids,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["items"] });
          queryClient.invalidateQueries({ queryKey: ["items-tab"] });
          onClose();
        },
      }
    );
  };
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} className="w-[440px] py-5">
      <div className="px-5 flex gap-4">
        <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-[10px] bg-red_light">
          {React.cloneElement(icons.error, {
            fill: "#DF1C41",
          })}
        </span>
        <div className="space-y-1">
          <h1 className="text-[#0A0D14] font-semibold capitalize">
            delete {single ? "item" : "items"}
          </h1>
          <p className="text-[#525866] text-sm font-normal">
            Are you sure you want to delete{" "}
            {single ? "this item" : "these items"}? Some sales data will be lost
            if you delete {single ? "this item" : "these items"}.
          </p>
        </div>
      </div>
      <Separator />
      {/* <div className="px-5 flex justify-between items-center"> */}
      {/* <div className="flex items-center gap-2">
          <Checkbox
            id="delete"
            className="!border-gray-600 h-4 w-4 rounded-sm data-[state=checked]:bg-primary data-[state=checked]:border-none"
          />
          <label
            htmlFor="delete"
            className="text-sm font-normal text-[#0A0D14]"
          >
            Don&apos;t show it again
          </label>
        </div> */}
      <div className="grid grid-cols-2 gap-2.5 px-5">
        <Button
          label="Dismiss"
          className="bg-[#F1F1F2] text-[#181C32] hover:bg-[#F1F1F2]/90"
          onClick={onClose}
          disabled={isPending}
        />
        <Button
          label="Delete"
          className="bg-danger hover:bg-danger/90"
          onClick={deleteItem}
          loading={isPending}
        />
      </div>
      {/* </div> */}
    </ModalLayout>
  );
}

export default DeleteItem;

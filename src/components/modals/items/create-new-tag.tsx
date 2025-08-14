import { FormEvent, useState } from "react";
import { usePostData } from "../../../api/queryHooks";
import { useQueryClient } from "@tanstack/react-query";
import ModalLayout from "../../layouts/modal-layout";
import Input from "../../atoms/input";
import { Separator } from "../../ui/separator";
import Button from "../../atoms/button";

function CreateNewTag({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) {
  const { mutate, isPending } = usePostData();
  const [tagStore, setTagStore] = useState({
    name: "",
    description: "",
  });

  const updateTagStore = (name: string, value: any) => {
    setTagStore({ ...tagStore, [name]: value });
  };

  const queryClient = useQueryClient();
  const createTag = (e: FormEvent) => {
    e.preventDefault();
    mutate(
      { url: "/inventory/tags/store", payload: tagStore },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["itemtags"] });
          queryClient.invalidateQueries({ queryKey: ["itemtags_counts"] });
          onClose && onClose();
        },
      }
    );
  };
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="New Tag"
      className="w-[425px] pb-5"
    >
      <form className="space-y-5" onSubmit={createTag} action="">
        <div className="px-5 space-y-5">
          <Input
            type="text"
            placeholder="e.g Men Fashion"
            info="Enter a name for the tag. Tags help categorize items and make them easier to search for."
            label="Tag name "
            required
            labelClass="text-dark"
            value={tagStore.name}
            onChange={(e) => updateTagStore("name", e.target.value)}
          />

          <Input
            type="text-area"
            placeholder="Text here"
            info="Provide a description for the tag. This helps clarify its purpose and how it should be used for categorizing items."
            label="Description"
            labelClass="text-dark"
            rows={3}
            required
            value={tagStore.description}
            textAreaOnChange={(e) =>
              updateTagStore("description", e.target.value)
            }
          />
        </div>
        <Separator />

        <div className="flex justify-end gap-2.5 px-5">
          <Button
            label="Dismiss"
            className="px-4 bg-gray-300 text-gray-900 hover:bg-gray-400"
            onClick={onClose}
            disabled={isPending}
          />
          <Button
            loading={isPending}
            label="Create"
            className="px-4"
            type="submit"
          />
        </div>
      </form>
    </ModalLayout>
  );
}

export default CreateNewTag;

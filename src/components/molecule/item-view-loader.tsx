import React from "react";
import { Skeleton } from "../ui/skeleton";
import Container from "../atoms/container";

function ItemViewLoader() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-[500px] rounded-md" />
          <Skeleton className="h-5 w-[500px] rounded-md" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-[140px] rounded-md" />
          <Skeleton className="h-9 w-[140px] rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Container className="p-4 flex flex-col gap-3">
          <Skeleton className="flex-grow w-full rounded-md" />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-[79px] rounded-md" />
            <Skeleton className="h-[79px] rounded-md" />
            <Skeleton className="h-[79px] rounded-md" />
          </div>
        </Container>

        <div className="space-y-8 col-span-2">
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-4 w-[326px] rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-[150px] rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <Skeleton className="h-9 w-[500px] rounded-md" />

          <div className="flex gap-3">
            <Skeleton className="h-12 w-[115px] rounded-md" />
            <Skeleton className="h-12 w-[150px] rounded-md" />
            <Skeleton className="h-12 w-[171px] rounded-md" />
          </div>

          <Skeleton className="h-3.5 w-[337px] rounded-md" />
        </div>
      </div>

      <div className="flex gap-4">
        <Skeleton className="h-3.5 w-[140px] rounded-md" />
        <Skeleton className="h-3.5 w-[140px] rounded-md" />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="border rounded-xl border-gray-200 p-4 gap-4 flex flex-col"
          >
            <Skeleton className="h-3.5 w-[140px] rounded-md" />
            <Skeleton className="h-10 w-[200px] rounded-md" />
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className=" gap-4 flex flex-col">
            <Skeleton className="h-3.5 w-[140px] rounded-md" />
            <Skeleton className="h-[163px] w-[896px] rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemViewLoader;

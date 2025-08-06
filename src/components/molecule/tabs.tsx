import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";

const tabsData: Tab[] = [
  {
    label: "All",
    count: 900,
  },
  {
    label: "Active",
    count: 10,
  },
  {
    label: "Inactive",
    count: 0,
  },
];
function Tabs({
  tabs = tabsData,
  loading,
}: {
  tabs?: Tab[];
  loading?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const switchTab = (tab: Tab, index: number) => {
    tab.link ? null : setActiveTab(index), tab.action && tab.action();
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-[30px]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className="flex items-center gap-2.5 group relative pb-2"
            onClick={() => switchTab(tab, index)}
          >
            <p
              className={cn(
                `group-hover:text-gray-900 duration-200 text-gray-800 font-normal text-sm first-letter:uppercase`,
                index === activeTab ? "text-gray-900 font-semibold" : null
              )}
            >
              {tab.label}
            </p>
            {loading ? (
              <Skeleton className="h-[26px] rounded w-8" />
            ) : (
              <>
                {" "}
                {tab.count! >= 0 ? (
                  <span
                    className={cn(
                      `rounded px-[7px] h-[26px] flex items-center text-xs font-semibold duration-200 group-hover:bg-primary_light group-hover:text-primary  bg-gray-200 text-gray-500`,
                      index === activeTab
                        ? "bg-primary_light text-primary"
                        : null
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </>
            )}
            {index === activeTab ? (
              <div className="h-[5px] rounded bg-primary absolute left-0 right-0 -bottom-[5px]"></div>
            ) : null}
          </button>
        ))}
      </div>
      <div className=" h-[5px] rounded bg-gray-300"></div>
    </div>
  );
}

export default Tabs;

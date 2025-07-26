import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { icons } from "../../assets/icons";

function InfoCard({
  children,
  trigger,
  fieldName,
  align = "start",
}: {
  children: React.ReactNode;
  trigger?: any;
  fieldName?: string;
  align?: "start" | "center" | "end";
}) {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        {trigger ?? icons.info_input}
      </HoverCardTrigger>
      <HoverCardContent
        align={align}
        className="bg-[#0A0D14] text-[#CDD0D5] text-xs font-normal border-none"
      >
        {/* "info content goes here"  */}
        {fieldName ? (
          <p className="text-sm font-medium text-white first-letter:uppercase">
            {fieldName}
          </p>
        ) : null}
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}

export default InfoCard;

import { cn } from "../../lib/utils";

function StatusComponent({ status }: { status: string }) {
  const success = [
    "active",
    "approved",
    "published",
    "received",
    "returned",
    "completed",
    "reconciled",
    "credit",
  ];
  const danger = [
    "inactive",
    "pending",
    "expired",
    "expiring",
    "rejected",
    "voided",
    "cancelled",
    "debit",
    "out of stock",
  ];
  const warning = ["pending", "paylater", "suspended", "awaiting_approval"];
  const draft = ["draft", "in_transit"];
  const ongoing = ["ongoing"];

  return (
    <span
      className={cn(
        `font-semibold text-xs rounded p-[7px] capitalize text-center min-w-[70px] bg-gray-300 text-gray-700`,
        success.includes(status) ? "text-success bg-success-light" : null,
        danger.includes(status) ? "text-danger bg-danger_light" : null,
        warning.includes(status) ? "text-warning bg-warning-light" : null,
        draft.includes(status) ? "text-black bg-[#E1E3EA]" : null,
        ongoing.includes(status) ? "text-[#7239EA] bg-[#f5edff]" : null
      )}
    >
      {status?.replace("_", " ")}
    </span>
  );
}

export default StatusComponent;

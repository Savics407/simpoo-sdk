import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
function Skeleton({ className, ...props }) {
    return (_jsx("div", { className: cn("animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800", className), ...props }));
}
export { Skeleton };
//# sourceMappingURL=skeleton.js.map
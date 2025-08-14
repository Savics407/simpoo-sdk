import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
function Container({ children, className, }) {
    return (_jsx("div", { className: cn("border rounded-xl py-[30px] border-gray-200 ", className), children: children }));
}
export default Container;
//# sourceMappingURL=container.js.map
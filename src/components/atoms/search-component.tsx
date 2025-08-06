import { icons } from "../../assets/icons";
import { cn } from "../../lib/utils";

interface SearchProps extends IInput {
  placeholder: string;
  className?: string;
  inputClass?: string;
  [key: string]: any;
}
function SearchComponent({
  placeholder,
  className,
  inputClass,
  ...props
}: SearchProps) {
  return (
    <div
      className={cn(
        `h-12 border border-gray-300 rounded-md w-[320px] flex`,
        className
      )}
    >
      <span className="bg-gray-200 w-[38px] flex items-center justify-center shrink-0 rounded-l-[6px] ">
        {icons.magnifier}
      </span>
      <input
        type="search"
        placeholder={placeholder}
        className="w-full px-3 text-dark text-sm font-medium bg-transparent outline-none rounded-r-[6px]"
        {...props}
      />
    </div>
  );
}

export default SearchComponent;

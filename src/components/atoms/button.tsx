"use client";

import { cn } from "../../lib/utils";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Button({
  label,
  left_addon,
  right_addon,
  className,
  disabled,
  loading,
  mode = "contained",
  onClick,
  type,
  loaderColor = "#fff",
  ...props
}: {
  // label: string;
  left_addon?: any;
  loaderColor?: string;
  right_addon?: any;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  mode?: "text" | "contained";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `${
          mode === "contained"
            ? "bg-primary hover:bg-button h-[38px] px-3 text-white"
            : "text-primary hover:text-button bg-transparent"
        } flex gap-[5px] transition ease-in items-center justify-center font-semibold text-[13px] rounded-md disabled:opacity-70 disabled:cursor-not-allowed`,
        className
      )}
      disabled={disabled ?? loading}
      type={type}
      {...props}
    >
      {loading ? (
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color={loaderColor}
          radius="9"
          ariaLabel="three-dots-loading"
        />
      ) : (
        <>
          {left_addon}
          <span className="first-letter:uppercase">{label}</span>
          {right_addon}
        </>
      )}
    </button>
  );
}

export default Button;

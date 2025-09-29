import React from "react";
import clsx from "clsx";

export default function ButtonComponent({
  className = "",
  startIcon,
  endIcon,
  onClick,
  isActive,
  disabled,
  title,
  legenda,
  paddingX = "px-4",
  paddingY = "py-2",
  circular = false,
  backgroundColor,
}) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2",
        "rounded-lg font-medium text-sm transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",

        isActive
          ? "bg-gradient-to-r from-blue-800 to-blue-900 shadow-inner transform translate-y-0"
          : "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-900 transform hover:-translate-y-0.5",

        paddingX,
        paddingY,

        circular && "rounded-full",

        className
      )}
      onClick={onClick}
      disabled={disabled}
      title={legenda}
      style={{
        width: circular ? "auto" : undefined,
        height: circular ? "auto" : undefined,
        backgroundColor: backgroundColor,
      }}
    >
      {circular ? (
        title
      ) : (
        <>
          {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
          {title}
          {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
        </>
      )}
    </button>
  );
}

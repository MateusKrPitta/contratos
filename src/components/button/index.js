import React from "react";
import LoadingLogin from "../loading/loading-login";

export default function ButtonComponent({
  className = "",
  startIcon,
  endIcon,
  fontWeight = "semibold",
  fontSize = "sm",
  textAlign = "center",
  onClick,
  id,
  isActive,
  disabled,
  title,
  subtitle,
  loading = false,
}) {
  const tailwindClasses = `
    ${className} 
    p-2
    flex
    items-center
    justify-start
    gap-2
    rounded-lg
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-blue-500
    font-${fontWeight}
    text-${fontSize}
    text-${textAlign}
    ${
      disabled || loading
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : isActive
        ? "bg-gradient-to-r from-blue-800 to-blue-900 text-white text-xs shadow-inner"
        : "bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs shadow-md hover:from-blue-700 hover:to-blue-900 hover:shadow-lg transform hover:-translate-y-0.5"
    }
  `;

  return (
    <button
      id={id}
      className={tailwindClasses}
      onClick={onClick}
      disabled={disabled || loading}
      title={subtitle}
    >
      {loading ? (
        <LoadingLogin />
      ) : (
        <>
          {startIcon && (
            <span className="flex-shrink-0 text-xs">{startIcon}</span>
          )}
          {title}
          {endIcon && <span className="flex-shrink-0 text-xs">{endIcon}</span>}
        </>
      )}
    </button>
  );
}

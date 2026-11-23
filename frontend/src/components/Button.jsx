
import React from "react";
import "../styles/Button.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  className = "",
  fullWidth = false,
  ...rest
}) => {
  const buttonClasses = [
    "custom-button",
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? "button-full-width" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <>
          <span className="button-spinner"></span>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

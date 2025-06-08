import React from "react";
import { ButtonProps } from "../types";

// A general button wrapper with default styling

function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button 
      {...props} 
      className={`px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button; 
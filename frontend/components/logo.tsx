import React from "react";

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="w-8 h-8 rounded-md bg-gradient-primary flex items-center justify-center animate-pulse-soft">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-white"
          >
            <path d="m8 14 4-4 4 4" />
            <path d="M8 18 12 14 16 18" />
            <path d="M12 4 12 14" />
          </svg>
        </div>
        <div className="absolute -right-1 -top-1 w-3 h-3 bg-accent rounded-full border-2 border-background"></div>
      </div>
      <span className="font-bold text-lg tracking-tight">FileFuse</span>
    </div>
  );
};

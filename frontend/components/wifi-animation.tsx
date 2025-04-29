import React from "react";

interface WifiAnimationProps {
  active: boolean;
}

export function WifiAnimation({ active }: WifiAnimationProps) {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          active ? "text-green-500" : "text-muted-foreground/40"
        }`}
      >
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className={`absolute rounded-full border-4 transition-all duration-700 ${
              active
                ? "border-green-500/30 animate-pulse-soft"
                : "border-muted-foreground/20"
            }`}
            style={{
              width: `${index * 30 + 20}%`,
              height: `${index * 30 + 20}%`,
              animationDelay: `${index * 200}ms`,
            }}
          />
        ))}
        <div
          className={`h-3 w-3 rounded-full ${
            active ? "bg-green-500" : "bg-muted-foreground/40"
          }`}
        />
      </div>
    </div>
  );
}

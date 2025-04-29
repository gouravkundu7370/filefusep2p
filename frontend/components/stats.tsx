import React from "react";

export const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
      {[
        { value: "2.3M+", label: "Files Shared" },
        { value: "100%", label: "Secure Transfer" },
        { value: "0", label: "Data Stored" },
        { value: "24/7", label: "Availability" },
      ].map((stat, index) => (
        <div key={index} className="text-center p-4">
          <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-primary">
            {stat.value}
          </div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

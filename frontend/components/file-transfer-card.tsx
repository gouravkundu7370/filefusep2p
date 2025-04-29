import React from "react";
import { Upload, Download, ArrowRight } from "lucide-react";

type TransferType = "send" | "receive";

interface FileTransferCardProps {
  type: TransferType;
}

export const FileTransferCard: React.FC<FileTransferCardProps> = ({ type }) => {
  const isUpload = type === "send";

  return (
    <div className="relative p-6 rounded-xl subtle-border hover-lift bg-background/60 transition-all duration-500 h-full flex flex-col">
      <div
        className={`icon-box ${isUpload ? "text-violet-500" : "text-blue-500"}`}
      >
        {isUpload ? (
          <Upload className="h-5 w-5" />
        ) : (
          <Download className="h-5 w-5" />
        )}
      </div>

      <h3 className="text-lg font-medium mb-2">
        {isUpload ? "Send Files" : "Receive Files"}
      </h3>

      <p className="text-muted-foreground text-sm mb-4">
        {isUpload
          ? "Share files instantly with anyone. No size limits."
          : "Receive files directly from other users securely."}
      </p>

      <div className="flex items-center justify-center mt-auto">
        <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border">
          <span className="text-xs font-medium">You</span>
        </div>

        <ArrowRight className="mx-2 text-muted-foreground h-4 w-4" />

        <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border">
          <span className="text-xs font-medium">P2P</span>
        </div>

        <ArrowRight className="mx-2 text-muted-foreground h-4 w-4" />

        <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border">
          <span className="text-xs font-medium">Peer</span>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <div
          className={`h-2 w-2 rounded-full ${
            isUpload ? "bg-violet-500" : "bg-blue-500"
          } animate-pulse-soft`}
        ></div>
      </div>
    </div>
  );
};

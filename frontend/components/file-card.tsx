import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileIcon,
  ImageIcon,
  FileTextIcon,
  FileVideoIcon,
  FileAudioIcon,
  ArchiveIcon,
  FileIcon as GenericFileIcon,
} from "lucide-react";
import { formatBytes } from "@/lib/utils";

interface FileCardProps {
  file: File;
  className?: string;
}

export function FileCard({ file, className = "" }: FileCardProps) {
  // Helper function to determine file type icon
  const getFileIcon = () => {
    const type = file.type.split("/")[0];
    const extension = file.name.split(".").pop()?.toLowerCase();

    switch (type) {
      case "image":
        return <ImageIcon className="h-6 w-6 text-blue-500" />;
      case "text":
      case "application":
        if (extension === "pdf") {
          return <FileTextIcon className="h-6 w-6 text-red-500" />;
        }
        return <FileTextIcon className="h-6 w-6 text-yellow-500" />;
      case "video":
        return <FileVideoIcon className="h-6 w-6 text-purple-500" />;
      case "audio":
        return <FileAudioIcon className="h-6 w-6 text-green-500" />;
      default:
        if (extension === "zip" || extension === "rar" || extension === "7z") {
          return <ArchiveIcon className="h-6 w-6 text-orange-500" />;
        }
        return <GenericFileIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Card className={`subtle-border overflow-hidden ${className}`}>
      <CardContent className="p-4 flex items-center">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-secondary/80">
          {getFileIcon()}
        </div>
        <div className="ml-4 overflow-hidden flex-1">
          <p className="font-medium text-sm truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatBytes(file.size)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

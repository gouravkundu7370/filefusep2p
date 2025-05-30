"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  WifiIcon,
  Loader2Icon,
  CheckIcon,
  AlertCircleIcon,
  DownloadIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { WifiAnimation } from "@/components/wifi-animation";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCard } from "@/components/file-card";
import { useSearchParams } from "next/navigation";

export default function ReceivePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [fileMetadata, setFileMetadata] = useState<{
    name: string;
    size: number;
    type?: string;
  } | null>(null);
  const [transferProgress, setTransferProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [receivedFile, setReceivedFile] = useState<File | null>(null);

  const receivedBytes = useRef<number>(0);
  const fileSizeRef = useRef<number>(0);
  const wsRef = useRef<WebSocket | null>(null);
  const receivedChunksRef = useRef<ArrayBuffer[]>([]);
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const senderId = searchParams.get("id");

    if (senderId) {
      connectWebSocket(senderId);
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleFileInfo = (data: {
    name: string;
    size: number;
    mimeType?: string;
  }) => {
    const fileInfo = {
      name: data.name,
      size: data.size,
      type: data.mimeType || "application/octet-stream",
    };
    setFileMetadata(fileInfo);
    fileSizeRef.current = data.size;
    receivedChunksRef.current = [];
    receivedBytes.current = 0;
    setTransferProgress(0);
    setError(null);
  };

  const handleReceivedChunk = (chunkData: ArrayBuffer) => {
    if (!chunkData || chunkData.byteLength === 0) return;

    receivedChunksRef.current.push(chunkData);
    receivedBytes.current += chunkData.byteLength;

    if (fileSizeRef.current > 0) {
      const progress = Math.min(
        100,
        Math.floor((receivedBytes.current / fileSizeRef.current) * 100)
      );
      setTransferProgress(progress);
    }
  };

  const connectWebSocket = (senderId: string) => {
    setIsConnecting(true);
    setError(null);
    receivedChunksRef.current = [];
    receivedBytes.current = 0;
    setTransferProgress(0);

    const ws = new WebSocket(`ws://${window.location.hostname}:8000/ws`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected from Receiver 🎯");
      reconnectAttemptsRef.current = 0;
      const connectionId =
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : "fallback-" + Math.random().toString(36).substring(2, 15);

      ws.send(JSON.stringify({ type: "register", connectionId }));
      ws.send(
        JSON.stringify({
          target_id: senderId,
          type: "receiver-ready",
          senderId: connectionId,
        })
      );

      setIsConnected(true);
      setIsConnecting(false);
    };

    ws.onmessage = (event) => {
      if (typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "file-info") {
            handleFileInfo(data);
          } else if (data.type === "file-end") {
            const expectedSize = data.totalBytes || fileMetadata?.size || 0;
            setTimeout(() => {
              if (receivedBytes.current >= expectedSize * 0.95) {
                completeFileTransfer();
              }
            }, 500);
          }
        } catch (e) {
          console.error("Error parsing message", e);
        }
      } else if (event.data instanceof ArrayBuffer) {
        handleReceivedChunk(event.data);
      } else if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            handleReceivedChunk(reader.result as ArrayBuffer);
          }
        };
        reader.readAsArrayBuffer(event.data);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
      setError("Connection error. Please try again.");
      setIsConnecting(false);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setIsConnecting(false);
      if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttemptsRef.current++;
        setTimeout(() => connectWebSocket(senderId), RECONNECT_DELAY);
      }
    };
  };

  const completeFileTransfer = () => {
    try {
      if (receivedChunksRef.current.length === 0) {
        throw new Error("No data received - transfer failed");
      }

      const blob = new Blob(receivedChunksRef.current, {
        type: fileMetadata?.type || "application/octet-stream",
      });

      if (blob.size === 0) {
        throw new Error("Received empty file");
      }

      const file = new File([blob], fileMetadata?.name || "received-file", {
        type: fileMetadata?.type,
      });
      setReceivedFile(file);

      const url = URL.createObjectURL(blob);
      setFileUrl(url);
      setError(null);
    } catch (e) {
      console.error("Error completing transfer", e);
      setError(
        `Failed to process file: ${
          e instanceof Error ? e.message : "Unknown error"
        }`
      );
    }
  };

  const downloadFile = () => {
    if (!fileUrl || !fileMetadata) return;
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileMetadata.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const searchParams = useSearchParams();
  const senderId = searchParams.get("id");

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <header className="container flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/80"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <ThemeToggle />
      </header>

      <main className="flex-1 container flex flex-col items-center justify-center py-8 max-w-md">
        <Card className="w-full subtle-border shadow-lg hover-lift bg-background/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-6">
            {!senderId ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center">
                  <WifiIcon className="h-6 w-6" />
                </div>
                <h1 className="text-3xl font-bold">No Transfer ID</h1>
                <p className="text-muted-foreground">
                  You need a transfer ID to receive files.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => (window.location.href = "/")}
                >
                  Go to Home
                </Button>
              </div>
            ) : !isConnected && !isConnecting ? (
              <>
                <div className="text-center space-y-3">
                  <h1 className="text-3xl font-bold">Ready to Receive</h1>
                  <p className="text-muted-foreground">
                    Connect to the server to receive the file
                  </p>
                </div>
                <div className="flex flex-col items-center my-6">
                  <WifiAnimation active={false} />
                </div>
                <div className="text-center mb-6">
                  <Badge variant="outline" className="px-3 py-1">
                    Transfer ID: {senderId}
                  </Badge>
                </div>
                {error && (
                  <div className="w-full p-4 bg-destructive/10 rounded-lg flex items-start space-x-3 mb-4">
                    <AlertCircleIcon className="h-5 w-5 text-destructive shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                <Button
                  className="w-full"
                  onClick={() => connectWebSocket(senderId)}
                >
                  Connect to Server
                </Button>
              </>
            ) : isConnecting ? (
              <div className="text-center space-y-4">
                <Badge variant="outline" className="mx-auto mb-4 animate-pulse">
                  Connecting...
                </Badge>
                <h1 className="text-3xl font-bold">Establishing Connection</h1>
                <WifiAnimation active={false} />
                <p className="text-muted-foreground mt-4">
                  Setting up secure WebSocket connection...
                </p>
                <Loader2Icon className="h-8 w-8 animate-spin text-primary mx-auto" />
              </div>
            ) : fileUrl && receivedFile ? (
              <div className="space-y-6 text-center">
                <Badge
                  variant="default"
                  className="bg-green-500 hover:bg-green-500"
                >
                  Transfer Complete
                </Badge>
                <h1 className="text-3xl font-bold">File Received</h1>
                <FileCard file={receivedFile} className="my-6" />
                <Progress value={100} className="h-2 my-2" />
                <Button className="w-full" onClick={downloadFile}>
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download File
                </Button>
              </div>
            ) : (
              <div className="space-y-4 ">
                <div
                  className="flex flex-col justify-center items-center
                "
                >
                  <div className="text-center space-y-3 mb-6">
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-primary leading-tight p-2">
                      Receiving File
                    </h1>
                    <Badge
                      variant="default"
                      className="bg-green-500 hover:bg-green-500"
                    >
                      Connected
                    </Badge>
                  </div>
                  <WifiAnimation active={true} />
                </div>
                {fileMetadata && (
                  <div className="mb-6 text-sm text-center">
                    <p>
                      {fileMetadata.name} (
                      {(fileMetadata.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Receiving file...</span>
                    <span>{transferProgress}%</span>
                  </div>
                  <Progress value={transferProgress} className="h-2" />
                </div>
                <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground p-3 rounded-lg bg-secondary/50 glass">
                  <Loader2Icon className="h-4 w-4 animate-spin mr-2" />
                  <span>Please keep this window open</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

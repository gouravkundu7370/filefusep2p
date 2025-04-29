import React from "react";
import Link from "next/link";
import { ArrowRight, File, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { Stats } from "@/components/stats";
import { FileTransferCard } from "@/components/file-transfer-card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      {/* Header */}
      <header className="container flex items-center justify-between p-4 z-10">
        <Logo />
        <div className="flex items-center space-x-4">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            How it works
          </Link>
          
          <ThemeToggle />
        </div>
      </header>
      

      {/* Hero section */}
      <section className="flex-1 container flex flex-col items-center justify-center max-w-6xl py-16 md:py-24">
        <div className="text-center space-y-6 w-full max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 text-xs font-medium text-accent">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Peer-to-Peer File Transfer
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-primary leading-tight">
            Share files securely and instantly
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Fast, reliable, and private P2P file transfers. No registration
            required, no size limits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href={"/send"}>
              <Button
                size="lg"
                className="w-full sm:w-auto group px-8 py-7 rounded-xl hover-lift bg-gradient-primary hover:opacity-90"
              >
                Send Files
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        {/* <Link href={"/receive"}>
          <Button>Receive</Button>
        </Link> */}

        {/* Stats display */}
        <div className="w-full mt-20">
          <Stats />
        </div>

        {/* Transfer visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mt-20">
          <FileTransferCard type="send" />
          <FileTransferCard type="receive" />
        </div>

        {/* Features section */}
        <div id="features" className="w-full max-w-5xl mx-auto mt-24 pt-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose FileFuse?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="feature-card">
              <div className="icon-box">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium mb-2">End-to-End Encrypted</h3>
              <p className="text-muted-foreground text-sm">
                Your files are encrypted from end to end and never stored on any
                servers.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon-box">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm">
                Direct peer-to-peer connections provide the fastest possible
                transfer speeds.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon-box">
                <File className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Size Limits</h3>
              <p className="text-muted-foreground text-sm">
                Transfer files of any size without restrictions of traditional
                sharing methods.
              </p>
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div
          id="how-it-works"
          className="w-full max-w-5xl mx-auto mt-24 pt-8 pb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-border"></div>

            {/* Steps */}
            {[
              {
                number: 1,
                title: "Select Files",
                description:
                  "Choose the files you want to send from your device.",
              },
              {
                number: 2,
                title: "Generate Link",
                description: "Get a secure link to share with the recipient.",
              },
              {
                number: 3,
                title: "Peer Connection",
                description:
                  "Direct transfer occurs when the recipient opens the link.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-lg font-bold text-accent mb-4 z-10 relative">
                  {step.number}
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-8 border-t border-border flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              © 2025 FileFuse. All rights reserved.
            </p>
          </div>

          {/* If you re-enable these links, use Link here as well */}
          {/* <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <Link
              href="#privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div> */}
        </div>
      </footer>
    </div>
  );
}

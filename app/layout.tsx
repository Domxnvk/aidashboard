import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import StaticBackground from "@/components/StaticBackground";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "font-sans antialiased overflow-x-hidden max-w-full",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {/* Root container with minimum height of viewport */}
          <div className="relative min-h-screen flex flex-col">
            {/* Static background for the whole page */}
            <StaticBackground />

            {/* Navbar stays fixed at top */}
            <Navbar />

            {/* Content wrapper - takes all available space and centers content */}
            <div className="flex-1 flex flex-col">
              {/* Main content area */}
              <main className="container mx-auto max-w-7xl px-6 flex-1 flex flex-col">
                {children}
              </main>

              {/* Footer only appears at the bottom of content */}
              <Footer />
            </div>

            {/* <ChatBar /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}

import { Metadata, Viewport } from "next";

import { Footer, Navbar } from "@/components";
import "./globals.css";

// metadata
export const metadata: Metadata = {
  title: "Car Hub",
  description: "Discover the best cars in the world",
  authors: [{ name: "Sanidhya Kr. Verma", url: "https://github.com/sanidhyy" }],
  manifest: "/manifest.json",
};

// viewport
export const viewport: Viewport = {
  themeColor: "#2B59FF",
};

// page layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        {/* navbar */}
        <Navbar />
        {/* main */}
        <main>{children}</main>
        {/* footer */}
        <Footer />
      </body>
    </html>
  );
}

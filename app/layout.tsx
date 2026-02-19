import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-[#0f0f0f] text-white antialiased`}
      >
        <Navbar />
        <main className="overflow-x-hidden pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}

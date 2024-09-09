import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Terminal Tinder",
  description: "Generate and discover terminal color schemes",
  icons: {
    icon: '/app-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="absolute bottom-0 left-0 right-0 text-center p-2 text-sm text-gray-500 dark:text-gray-400">
          DWS {new Date().getFullYear()}. <a href="https://dws.rip" className="underline" target="_blank" rel="noopener noreferrer">Powered By DWS</a>
        </footer>
      </body>
    </html>
  );
}

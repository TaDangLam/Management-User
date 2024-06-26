'use client'
import { Inter } from "next/font/google";
import { useRouter } from 'next/navigation'

import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  const router = useRouter();

  // from-[#2B32B2] to-[#1488CC]
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className="">
            {children}
          </div>
        </StoreProvider>  
      </body>
    </html>
  );
}

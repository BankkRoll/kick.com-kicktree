import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import CustomNavbar from "@/components/NavBar";
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CustomNavbar />
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}

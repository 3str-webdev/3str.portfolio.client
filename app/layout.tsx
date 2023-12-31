import { classes } from "@/shared/lib";
import { Header } from "@/widgets/header";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: "3str.portfolio",
  description: "Сайт портфолио Тенькаева Сергея (3str)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classes(
          montserrat.className,
          "bg-neutral-900 text-neutral-100 font-[14px] md:font-[16px]"
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

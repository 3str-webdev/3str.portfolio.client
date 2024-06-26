import { Header } from "@/widgets/header";
import { Periphery } from "@/widgets/periphery";
import { Providers } from "@/widgets/providers/providers";
import clsx from "clsx";
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
				className={clsx(
					montserrat.className,
					"flex flex-col",
					"bg-neutral-900 text-neutral-100 font-[14px] md:font-[16px]",
				)}
			>
				<Header />
				<Providers>
					<main className="relative flex-1 mt-[60px] z-10 container mx-auto">
						{children}
					</main>
					<div id="modal-portal" />
					<Periphery />
				</Providers>
			</body>
		</html>
	);
}

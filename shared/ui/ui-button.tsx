import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type UIButtonSize = "sm" | "md";
type UIButtonColor = "primary" | "neutral";

export interface UIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: UIButtonSize;
	color?: UIButtonColor;
}

export const UIButton = ({
	size = "md",
	color = "primary",
	disabled,
	className,
	children,
	...props
}: UIButtonProps) => {
	const sizeClassName: Record<UIButtonSize, string> = {
		sm: "px-3 py-1 text-sm rounded-md",
		md: "px-4 py-2 text-sm rounded-md",
	};
	const colorClassName: Record<UIButtonColor, string> = {
		primary: "bg-primary-500 hover:bg-primary-600",
		neutral: "bg-neutral-500 hover:bg-neutral-1",
	};

	return (
		<button
			{...props}
			className={clsx(
				"transition-colors",
				disabled && "opacity-60 pointer-events-none",
				sizeClassName[size],
				colorClassName[color],
				className,
			)}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

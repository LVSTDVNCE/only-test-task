import React from 'react';
import { forwardRef, type ReactNode } from 'react';

type TButtonProps = {
	className: string;
	onClick: () => void;
	disabled?: boolean;
	children?: ReactNode;
	style?: object;
};

export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
	({ className, onClick, disabled, children, style }, ref) => {
		return (
			<button
				ref={ref}
				className={className}
				onClick={onClick}
				disabled={disabled}
				style={style}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';

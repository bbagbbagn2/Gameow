'use client';

import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/utils/cn';

interface BasicSelectButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
	expanded?: boolean;
	placeholder?: string;
	value?: string | number | null;
	displayText?: string;
	isOpen?: boolean;
	side?: 'top' | 'bottom' | 'left' | 'right';
}

const basicSelectButtonVariants = cva(
	'bg-discord-surface border border-white/5 rounded-md font-bold text-sm outline-none flex items-center justify-between text-left transition-all cursor-pointer hover:bg-discord-hover hover:border-white/10',
	{
		variants: {
			expanded: {
				true: 'w-full h-10 px-3 py-2',
				false: 'w-32 h-10 px-3 py-2'
			},
			hasValue: {
				true: 'text-primary-400 border-primary-500/30 bg-primary-500/5',
				false: 'text-discord-muted'
			}
		},
		defaultVariants: {
			expanded: false,
			hasValue: false
		}
	}
);

const arrowVariants = cva('ml-1 transition-transform duration-200 ease-in-out opacity-60', {
	variants: {
		isOpen: {
			true: 'rotate-180',
			false: 'rotate-0'
		}
	},
	defaultVariants: {
		isOpen: false
	}
});

const BasicSelectButton = forwardRef<HTMLButtonElement, BasicSelectButtonProps>(
	(
		{
			expanded = false,
			className = '',
			placeholder = '선택하세요',
			disabled = false,
			value,
			displayText,
			isOpen = false,
			children,
			onClick,
			...rest
		},
		ref
	) => {
		const hasValue = Boolean(value && value !== '');

		return (
			<button
				ref={ref}
				type="button"
				className={cn(
					basicSelectButtonVariants({ expanded, hasValue }),
					disabled && 'cursor-not-allowed opacity-50',
					className
				)}
				onClick={onClick}
				disabled={disabled}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-label={displayText ? `선택됨: ${displayText}` : placeholder}
				{...rest}>
				<span className="truncate">
					{children}
					{displayText || placeholder}
				</span>
				{!disabled && (
					<img
						src="/icons/arrow_invert.svg"
						alt="arrow"
						className={cn(arrowVariants({ isOpen }), 'h-5 w-5 brightness-0 invert')}
					/>
				)}
			</button>
		);
	}
);

BasicSelectButton.displayName = 'BasicSelectButton';

export default BasicSelectButton;

import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

export const basicButtonVariants = cva(
	'relative flex items-center justify-center font-bold transition-all duration-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide',
	{
		variants: {
			variant: {
				solid: 'bg-primary-500 text-discord-bg hover:bg-primary-400 active:scale-95',
				outlined: 'border border-primary-500/30 text-primary-500 hover:bg-primary-500/10 active:scale-95',
				secondary: 'bg-discord-card text-discord-text hover:bg-discord-hover active:scale-95'
			},
			size: {
				md: 'px-4 py-2 text-sm h-10',
				lg: 'px-6 py-3 text-base h-12 w-full'
			}
		},
		defaultVariants: {
			variant: 'solid',
			size: 'md'
		}
	}
);

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	isLarge?: boolean;
	isActive?: boolean;
	outlined?: boolean;
	variant?: 'solid' | 'outlined' | 'secondary';
	className?: string;
	ariaLabel?: string;
}

type button = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function BasicButton({
	children,
	onClick = () => {},
	isLarge = false,
	isActive = true,
	outlined = false,
	variant: propVariant,
	className = '',
	ariaLabel = '',
	...rest
}: button) {
	const variant = propVariant || (outlined ? 'outlined' : isActive ? 'solid' : 'secondary');

	return (
		<button
			onClick={onClick}
			disabled={!isActive}
			{...rest}
			className={cn(
				basicButtonVariants({
					variant: variant as 'solid' | 'outlined' | 'secondary',
					size: isLarge ? 'lg' : 'md'
				}),
				className
			)}
			aria-label={ariaLabel}>
			{children}
		</button>
	);
}



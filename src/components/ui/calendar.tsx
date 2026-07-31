'use client';

import { useEffect, useRef } from 'react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = 'label',
	buttonVariant = 'ghost',
	formatters,
	components,
	...props
}: React.ComponentProps<typeof DayPicker> & {
	buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
	const defaultClassNames = getDefaultClassNames();

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				'bg-discord-surface group/calendar rounded-xl border border-white/5 p-4 shadow-2xl [--cell-size:--spacing(9)]',
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className
			)}
			captionLayout={captionLayout}
			formatters={{
				formatMonthDropdown: date => date.toLocaleString('default', { month: 'short' }),
				...formatters
			}}
			classNames={{
				root: cn('w-fit', defaultClassNames.root),
				months: cn('flex gap-6 flex-col md:flex-row relative', defaultClassNames.months),
				month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
				nav: cn('flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between px-2', defaultClassNames.nav),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					'size-8 aria-disabled:opacity-50 p-0 select-none text-primary-500 hover:bg-primary-500/10 transition-all rounded-full',
					defaultClassNames.button_previous
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					'size-8 aria-disabled:opacity-50 p-0 select-none text-primary-500 hover:bg-primary-500/10 transition-all rounded-full',
					defaultClassNames.button_next
				),

				month_caption: cn('flex items-center justify-center h-8 w-full', defaultClassNames.month_caption),
				caption_label: cn('select-none font-black text-white tracking-tight text-sm', defaultClassNames.caption_label),
				table: 'w-full border-collapse',
				weekdays: cn('flex mb-2', defaultClassNames.weekdays),
				weekday: cn(
					'text-discord-muted rounded-md flex-1 font-bold text-[10px] uppercase tracking-widest select-none',
					defaultClassNames.weekday
				),
				week: cn('flex w-full mt-1.5', defaultClassNames.week),
				day: cn(
					'relative w-full h-full p-0 text-center group/day aspect-square select-none flex items-center justify-center',
					defaultClassNames.day
				),
				today: cn(
					'text-primary-500 font-black after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary-500 after:rounded-full',
					defaultClassNames.today
				),
				outside: cn('text-discord-muted opacity-20 aria-selected:text-white', defaultClassNames.outside),
				disabled: cn('text-discord-muted opacity-50', defaultClassNames.disabled),
				hidden: cn('invisible', defaultClassNames.hidden),
				selected: 'bg-primary-500 text-discord-bg rounded-lg font-black shadow-[0_0_15px_rgba(5,242,219,0.3)]',
				...classNames
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => {
					return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
				},
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === 'left') {
						return <ChevronLeftIcon className={cn('size-4', className)} {...props} />;
					}

					if (orientation === 'right') {
						return <ChevronRightIcon className={cn('size-4', className)} {...props} />;
					}

					return <ChevronDownIcon className={cn('size-4', className)} {...props} />;
				},
				DayButton: CalendarDayButton,
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
						</td>
					);
				},
				...components
			}}
			{...props}
		/>
	);
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
	const defaultClassNames = getDefaultClassNames();

	const ref = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={cn(
				'data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground group-data-[focused=true]/day:z-base data-[selected-single=true]:bg-primary-500 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[selected-single=true]:text-white [&>span]:text-xs [&>span]:opacity-70',
				defaultClassNames.day,
				className
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };

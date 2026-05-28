'use client';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicSelectButton from '@/components/commons/basic/BasicSelectButton';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { cn } from '@/utils/cn';

interface SearchCalendarProps {
	/** 선택된 날짜 (없을 수 있음) */
	date?: Date;
	/** 날짜 상태를 갱신하는 함수 */
	setDate: Dispatch<SetStateAction<Date | undefined>>;
}

/**
 * 날짜를 선택할 수 있는 캘린더 선택 컴포넌트
 * 버튼 클릭 시 달력이 팝오버 형태로 열리며, 날짜 선택 시 상위 컴포넌트의 상태가 업데이트됩니다.
 *
 * @param {SearchCalendarProps} props - 현재 선택된 날짜와 날짜 변경 함수를 포함한 props
 */
export default function SearchCalendar({ date, setDate }: SearchCalendarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [tempDate, setTempDate] = useState<Date | undefined>(date);

	const formattedDate = useMemo(() => {
		if (!date) return undefined;
		return format(date, 'yy/MM/dd');
	}, [date]);

	const handleDateSelect = (date?: Date) => {
		setTempDate(date);
	};

	const handleApply = () => {
		if (!tempDate) return;
		setDate(tempDate);
		setIsOpen(false);
	};

	const handleReset = () => {
		setTempDate(undefined);
		setDate(undefined);
	};

	useEffect(() => {
		if (isOpen) return;
		setTempDate(undefined);
	}, [isOpen]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<BasicSelectButton
					placeholder={'날짜 전체'}
					value={formattedDate}
					displayText={formattedDate}
					isOpen={isOpen}
					side="right"
					onClick={() => setIsOpen(prev => !prev)}
				/>
			</PopoverTrigger>
			<PopoverContent
				className="bg-discord-surface border-white/10 flex min-w-[320px] flex-col items-center justify-center rounded-xl border p-4 shadow-2xl backdrop-blur-md"
				align="start"
				side="bottom"
				sideOffset={8}
				isModal={false}>
				<div className="flex w-full flex-col">
					<Calendar
						mode="single"
						selected={tempDate}
						onSelect={handleDateSelect}
						formatters={{
							formatWeekdayName: (date, options) => format(date, 'EEE', { locale: options?.locale })
						}}
						classNames={{
							months: 'flex flex-col space-y-4',
							month: 'space-y-4',
							caption: 'flex justify-center pt-1 relative items-center px-8',
							caption_label: 'text-sm font-bold text-white',
							nav: 'space-x-1 flex items-center',
							nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity',
							nav_button_previous: 'absolute left-1',
							nav_button_next: 'absolute right-1',
							table: 'w-full border-collapse space-y-1',
							head_row: 'flex w-full mt-2',
							head_cell: 'text-discord-muted rounded-md w-9 font-bold text-[10px] uppercase tracking-wider flex-1',
							row: 'flex w-full mt-2',
							cell: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 flex-1',
							day: cn(
								'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-discord-hover rounded-md transition-all flex items-center justify-center m-auto text-discord-text'
							),
							day_selected:
								'bg-primary-500 text-discord-bg font-bold hover:bg-primary-500 hover:text-discord-bg focus:bg-primary-500 focus:text-discord-bg',
							day_today: 'bg-discord-card text-primary-500 font-bold',
							day_outside: 'text-discord-muted opacity-30 pointer-events-none',
							day_disabled: 'text-discord-muted opacity-30',
							day_range_middle: 'aria-selected:bg-discord-accent aria-selected:text-discord-accent-foreground',
							day_hidden: 'invisible'
						}}
						fixedWeeks
					/>
					<div className="mt-6 flex w-full gap-2">
						<BasicButton
							variant="secondary"
							className="flex-1"
							onClick={handleReset}
							disabled={date === undefined && tempDate === undefined}>
							Reset
						</BasicButton>
						<BasicButton className="flex-1" onClick={handleApply} disabled={tempDate === undefined}>
							Apply
						</BasicButton>
					</div>
				</div>
			</PopoverContent>

		</Popover>
	);
}

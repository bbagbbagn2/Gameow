'use client';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { format } from 'date-fns';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicSelectButton from '@/components/commons/basic/BasicSelectButton';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
				className="bg-discord-surface flex min-w-[320px] flex-col items-center justify-center rounded-xl border border-white/10 p-4 shadow-2xl backdrop-blur-md"
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

import { format } from 'date-fns';
import { useState } from 'react';
import SearchInCalendarButton from '../calendar/SearchInCalendarButton';
import BasicSelectButton from '../commons/basic/BasicSelectButton';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function DateFilter({ onChange }: { onChange: (date?: Date) => void }) {
	const [date, setDate] = useState<Date>();
	const [isOpen, setIsOpen] = useState(false);

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);
		}
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild onClick={() => setIsOpen(true)}>
				<BasicSelectButton placeholder="날짜 선택" isOpen={isOpen} />
			</PopoverTrigger>
			<PopoverContent
				className="bg-discord-surface border-white/10 flex min-w-[320px] flex-col items-center justify-center rounded-2xl border p-4 shadow-2xl backdrop-blur-md"
				align="start"
				sideOffset={8}
				isModal={false}>
				<div className="flex w-full flex-col">
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect}
						formatters={{
							formatWeekdayName: (date, options) => format(date, 'EEE', { locale: options?.locale })
						}}
					/>
					<div className="mt-4 flex w-full">
						<SearchInCalendarButton
							date={date}
							setDate={res => {
								console.log(res);
								onChange?.(res);
							}}
							setIsOpen={setIsOpen}
						/>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

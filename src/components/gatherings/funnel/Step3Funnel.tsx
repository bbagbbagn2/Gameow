'use client';

import { Controller, useFormContext } from 'react-hook-form';

import GatheringCalendar from '@/components/commons/GatheringCalendar';

export default function Step3Funnel() {
	const {
		control,
		formState: { errors }
	} = useFormContext();

	return (
		<div className="mt-3 flex flex-col gap-3">
			<div className="flex flex-col gap-2">
				<Controller
					name="dateTime"
					control={control}
					defaultValue=""
					render={({ field }) => {
						return (
							<div className="flex flex-col gap-3">
								<label className="leading-base flex text-base font-semibold text-white">모임 날짜</label>
								<GatheringCalendar
									pageType="create"
									value={field.value ? new Date(field.value) : undefined}
									onChange={(date: Date) => {
										const isoFormatted = date.toISOString();
										field.onChange(isoFormatted);
									}}
								/>
								{typeof errors.dateTime?.message === 'string' && (
									<p className="leading-sm text-highlight text-start text-sm font-semibold">
										{errors.dateTime?.message}
									</p>
								)}
							</div>
						);
					}}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Controller
					name="registrationEnd"
					defaultValue=""
					control={control}
					render={({ field }) => {
						return (
							<div className="flex flex-col gap-3">
								<label className="leading-base flex text-base font-semibold text-white">마감 날짜</label>
								<GatheringCalendar
									pageType="create"
									value={field.value ? new Date(field.value) : undefined}
									onChange={(date: Date) => {
										const isoFormatted = date.toISOString();
										field.onChange(isoFormatted);
									}}
								/>
								{typeof errors.registrationEnd?.message === 'string' && (
									<p className="leading-sm text-highlight text-start text-sm font-semibold">
										{errors.registrationEnd?.message}
									</p>
								)}
							</div>
						);
					}}
				/>
			</div>
		</div>
	);
}

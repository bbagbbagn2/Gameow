'use client';

import { Control, Controller, FieldErrors, FieldPath } from 'react-hook-form';

import GatheringCalendar from '@/components/commons/GatheringCalendar';
import { GatheringSchemaType } from '@/utils/schema';

interface GatheringDateFieldProps {
	control: Control<GatheringSchemaType>;
	errors: FieldErrors<GatheringSchemaType>;
	label: string;
	name: FieldPath<Pick<GatheringSchemaType, 'dateTime' | 'registrationEnd'>>;
}

export default function GatheringDateField({ control, errors, label, name }: GatheringDateFieldProps) {
	const errorMessage = errors[name]?.message;

	return (
		<div className="flex flex-col gap-2">
			<Controller
				name={name}
				control={control}
				defaultValue=""
				render={({ field }) => {
					return (
						<div className="flex flex-col gap-3">
							<label className="leading-base flex text-base font-semibold text-white">{label}</label>
							<GatheringCalendar
								pageType="create"
								value={field.value ? new Date(field.value) : undefined}
								onChange={(date: Date) => {
									const isoFormatted = date.toISOString();
									field.onChange(isoFormatted);
								}}
							/>
							{typeof errorMessage === 'string' && (
								<p className="leading-sm text-highlight text-start text-sm font-semibold">{errorMessage}</p>
							)}
						</div>
					);
				}}
			/>
		</div>
	);
}

'use client';

import { useFormContext } from 'react-hook-form';

import GatheringDateField from '@/components/gatherings/create/fields/GatheringDateField';
import { GatheringSchemaType } from '@/utils/schema';

export default function ScheduleStep() {
	const {
		control,
		formState: { errors }
	} = useFormContext<GatheringSchemaType>();

	return (
		<div className="flex flex-col gap-5">
			<GatheringDateField control={control} errors={errors} label="모임 날짜" name="dateTime" />
			<GatheringDateField control={control} errors={errors} label="마감 날짜" name="registrationEnd" />
		</div>
	);
}

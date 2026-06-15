'use client';

import { useFormContext } from 'react-hook-form';

import CrewNameField from '@/components/gatherings/create/fields/CrewNameField';
import GenreSelectField from '@/components/gatherings/create/fields/GenreSelectField';
import { GatheringSchemaType } from '@/utils/schema';

export default function BasicInfoStep() {
	const {
		register,
		formState: { errors }
	} = useFormContext<GatheringSchemaType>();

	return (
		<div className="mt-3 flex flex-col gap-3">
			<CrewNameField errors={errors} register={register} />
			<GenreSelectField errors={errors} register={register} />
		</div>
	);
}

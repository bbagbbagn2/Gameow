'use client';

import { useFormContext } from 'react-hook-form';

import CategorySelectField from '@/components/gatherings/create/fields/CategorySelectField';
import ImageUploaderField from '@/components/gatherings/create/fields/ImageUploaderField';
import { GatheringSchemaType } from '@/utils/schema';

export default function CategoryImageStep() {
	const {
		setValue,
		control,
		watch,
		formState: { errors }
	} = useFormContext<GatheringSchemaType>();

	return (
		<div className="flex flex-col gap-5">
			<CategorySelectField control={control} errors={errors} />
			<ImageUploaderField errors={errors} setValue={setValue} watch={watch} />
		</div>
	);
}

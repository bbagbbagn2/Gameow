'use client';

import { useFormContext } from 'react-hook-form';

import CapacityField from '@/components/gatherings/create/fields/CapacityField';
import { CreateGathering } from '@/types/response/createGathering';

export default function CapacityStep() {
	const {
		register,
		formState: { errors }
	} = useFormContext<CreateGathering>();

	return <CapacityField errors={errors} register={register} />;
}

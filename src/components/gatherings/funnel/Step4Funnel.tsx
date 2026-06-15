'use client';

import { useFormContext } from 'react-hook-form';

import BasicInput from '@/components/commons/basic/BasicInput';
import { CreateGathering } from '@/types/response/createGathering';

export default function Step4Funnel() {
	const {
		register,
		formState: { errors }
	} = useFormContext<CreateGathering>();

	return (
		<div className="mt-3 flex h-full flex-col gap-2">
			<BasicInput
				id="gathering-capacity"
				label="모집 정원"
				type="number"
				placeholder="최소 5인 이상 입력해주세요"
				register={register('capacity', { valueAsNumber: true })}
			/>
			{typeof errors.capacity?.message === 'string' && (
				<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.capacity.message}</p>
			)}
		</div>
	);
}

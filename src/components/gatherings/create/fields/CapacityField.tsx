'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import BasicInput from '@/components/commons/basic/BasicInput';
import { CreateGathering } from '@/types/response/createGathering';

interface CapacityFieldProps {
	errors: FieldErrors<CreateGathering>;
	register: UseFormRegister<CreateGathering>;
}

export default function CapacityField({ errors, register }: CapacityFieldProps) {
	return (
		<div className="flex h-full items-start">
			<div className="w-full rounded-xl border border-white/5 bg-discord-bg/40 p-4">
				<BasicInput
					id="gathering-capacity"
					label="모집 정원"
					type="number"
					placeholder="최소 5인 이상 입력해주세요"
					register={register('capacity', { valueAsNumber: true })}
				/>
				{typeof errors.capacity?.message === 'string' && (
					<p className="leading-sm text-highlight mt-3 text-start text-sm font-semibold">{errors.capacity.message}</p>
				)}
			</div>
		</div>
	);
}

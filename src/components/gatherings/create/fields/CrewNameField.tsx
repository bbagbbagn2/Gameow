'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import BasicInput from '@/components/commons/basic/BasicInput';
import { GatheringSchemaType } from '@/utils/schema';

interface CrewNameFieldProps {
	errors: FieldErrors<GatheringSchemaType>;
	register: UseFormRegister<GatheringSchemaType>;
}

export default function CrewNameField({ errors, register }: CrewNameFieldProps) {
	return (
		<div className="flex flex-col gap-2">
			<BasicInput
				id="gathering-name"
				label="크루명"
				placeholder="네온 신호 수신 중... 크루명을 입력하세요 💫"
				className="w-full"
				register={register('name')}
			/>
			{typeof errors.name?.message === 'string' && (
				<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.name.message}</p>
			)}
		</div>
	);
}

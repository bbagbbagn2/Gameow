'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import SelectBox from '@/components/commons/SelectBox';
import { GatheringSchemaType } from '@/utils/schema';

const GENRE_OPTIONS = [
	{ value: '건대입구', text: 'AOS' },
	{ value: '을지로3가', text: 'Adventure' },
	{ value: '신림', text: 'FPS' },
	{ value: '홍대입구', text: 'RPG' }
];

interface GenreSelectFieldProps {
	errors: FieldErrors<GatheringSchemaType>;
	register: UseFormRegister<GatheringSchemaType>;
}

export default function GenreSelectField({ errors, register }: GenreSelectFieldProps) {
	return (
		<div className="flex w-full flex-col gap-3">
			<label htmlFor="gathering-location" className="leading-base flex text-base font-semibold text-white">
				장르 선택
			</label>
			<SelectBox
				options={GENRE_OPTIONS}
				expanded
				placeholder="👾 사이버 존 접속 중... 당신의 장르는?"
				register={register('location')}
			/>
			{typeof errors.location?.message === 'string' && (
				<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.location.message}</p>
			)}
		</div>
	);
}

'use client';

import { Control, Controller, FieldErrors } from 'react-hook-form';

import BasicCheckBox from '@/components/commons/basic/BasicCheckBox';
import { GatheringSchemaType } from '@/utils/schema';

interface CategorySelectFieldProps {
	control: Control<GatheringSchemaType>;
	errors: FieldErrors<GatheringSchemaType>;
}

export default function CategorySelectField({ control, errors }: CategorySelectFieldProps) {
	return (
		<Controller
			name="type"
			control={control}
			render={({ field }) => (
				<div className="flex w-full flex-col gap-3">
					<label className="font-semibold text-white">카테고리</label>
					<div className="max-mb:flex-wrap flex w-full justify-between gap-3">
						<BasicCheckBox
							title="함께 플레이"
							content="스팀"
							checked={field.value === 'OFFICE_STRETCHING'}
							onChange={() => field.onChange(field.value === 'OFFICE_STRETCHING' ? '' : 'OFFICE_STRETCHING')}
						/>

						<BasicCheckBox
							title="함께 플레이"
							content="온라인"
							checked={field.value === 'MINDFULNESS'}
							onChange={() => field.onChange(field.value === 'MINDFULNESS' ? '' : 'MINDFULNESS')}
						/>

						<BasicCheckBox
							title="교환/통신하기"
							checked={field.value === 'WORKATION'}
							onChange={() => field.onChange(field.value === 'WORKATION' ? '' : 'WORKATION')}
						/>
					</div>
					{typeof errors.type?.message === 'string' && (
						<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.type.message}</p>
					)}
				</div>
			)}
		/>
	);
}

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
					<label className="text-discord-muted pl-1 text-[11px] font-black tracking-wider uppercase">카테고리</label>
					<div className="max-mb:grid-cols-1 grid w-full grid-cols-3 gap-3">
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
						<p className="leading-sm text-highlight pl-1 text-start text-sm font-semibold">{errors.type.message}</p>
					)}
				</div>
			)}
		/>
	);
}

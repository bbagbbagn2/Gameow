'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm, type UseFormRegisterReturn } from 'react-hook-form';

import GatheringTabs from '@/app/(home)/GatheringTabs';
import SearchCalendar from '@/app/(home)/SearchCalendar';
import SelectBox from '@/components/commons/SelectBox';
import SortButton from '@/components/commons/SortButton';
import { GENRE_OPTIONS, SORT_OPTIONS } from '@/constants/options';

import CreateGatheringButton from '../CreateGatheringButton';

export interface FilterCriteria {
	/** 선택된 모임 유형 */
	type: string;
	/** 선택된 지역 */
	location: string | number;
	/** 선택된 날짜 (선택되지 않을 수도 있음) */
	date?: Date;
	/** 선택된 정렬 기준 */
	sort: string;
}

interface GatheringFilterBarProps {
	/** 필터 조건을 상위 컴포넌트에 전달하는 함수 */
	setFilterCriteria: Dispatch<SetStateAction<FilterCriteria>>;
}

interface SortFormValues {
	/** 정렬 기준 */
	sort: string;
}

/**
 * 모임 목록 상단의 필터 바 컴포넌트
 * 유형, 지역, 날짜, 정렬 옵션을 선택해 모임 목록을 필터링합니다.
 * 또한 ‘모임 만들기’ 버튼을 통해 모임 생성 모달을 엽니다.
 *
 * @param {GatheringFilterBarProps} props - 필터 조건 갱신 함수를 포함한 props
 */
export default function GatheringFilterBar({ setFilterCriteria }: GatheringFilterBarProps) {
	const [selectedType, setSelectedType] = useState<string>('');
	const [selectedLocation, setSelectedLocation] = useState<string | number>('');
	const [selectedDate, setSelectedDate] = useState<Date>();

	const methods = useForm<SortFormValues>({
		defaultValues: { sort: 'newest' }
	});
	const { control, watch } = methods;
	const selectedSort = watch('sort');

	useEffect(() => {
		setFilterCriteria({
			type: selectedType,
			location: selectedLocation,
			date: selectedDate,
			sort: selectedSort
		});
	}, [selectedType, selectedLocation, selectedDate, selectedSort, setFilterCriteria]);

	return (
		<FormProvider {...methods}>
			<div className="flex w-full flex-col gap-6">
				<GatheringTabs setSelectedType={setSelectedType} button={<CreateGatheringButton />} />

				<div className="h-px w-full bg-white/5" />

				<div className="flex w-full items-center justify-between">
					<div className="flex items-center gap-3">
						<SelectBox options={GENRE_OPTIONS} placeholder="장르 전체" onChange={setSelectedLocation} />
						<div className="h-6 w-px bg-white/10" />
						<SearchCalendar date={selectedDate} setDate={setSelectedDate} />
					</div>
					<Controller
						name="sort"
						control={control}
						render={({ field }) => (
							<SortButton
								options={SORT_OPTIONS}
								defaultValue={field.value}
								register={
									{
										name: field.name,
										onChange: field.onChange,
										onBlur: field.onBlur,
										ref: field.ref
									} as unknown as UseFormRegisterReturn
								}
							/>
						)}
					/>
				</div>
			</div>
		</FormProvider>
	);
}

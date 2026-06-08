'use client';

import { useState } from 'react';

import Chip from '@/components/commons/Chip';
import Tab from '@/components/commons/Tab';
import { SUB_TYPE_OPTIONS, TYPE_OPTIONS } from '@/constants/options';

interface GatheringTabsProps {
	/** 상위 컴포넌트에 선택된 모임 유형을 전달하는 함수 */
	setSelectedType: (type: string) => void;
	/** 탭 오른쪽에 표시할 버튼 요소 (예: '모임 만들기' 버튼) */
	button: React.ReactNode;
}

// TODO: 하드 코딩 수정
/**
 * 모임 유형 및 세부 유형(서브 타입)을 선택할 수 있는 탭 컴포넌트
 * 상위 컴포넌트로 선택된 타입을 전달하며, 특정 타입 선택 시 하위 옵션(Chip)을 표시합니다.
 *
 * @param {GatheringTabsProps} props - 선택된 타입을 업데이트하는 함수와 버튼 요소를 포함한 props
 */
export default function GatheringTabs({ setSelectedType, button }: GatheringTabsProps) {
	const DEFAULT_TYPE = 'DALLAEMFIT';
	const [type, setType] = useState<string>(DEFAULT_TYPE);
	const [subType, setSubType] = useState<string>(DEFAULT_TYPE);

	const handleTypeChange = (newType: string) => {
		setType(newType);
		if (newType === DEFAULT_TYPE) {
			setSubType(DEFAULT_TYPE);
			setSelectedType(DEFAULT_TYPE);
		} else {
			setSelectedType(newType);
		}
	};

	const handleSubTypeChange = (newSubType: string) => {
		setSubType(newSubType);
		setSelectedType(newSubType);
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<Tab options={TYPE_OPTIONS} selectedTab={type} onTabChange={handleTypeChange} />
				{button}
			</div>

			<div className="flex flex-wrap gap-2">
				{type === DEFAULT_TYPE ? (
					SUB_TYPE_OPTIONS.map(({ value, text, icon }) => (
						<Chip
							key={value}
							text={text}
							isActive={subType === value}
							imgUrl={icon}
							onClick={() => handleSubTypeChange(value as string)}
						/>
					))
				) : (
					<Chip text={'전체'} isActive={true} />
				)}
			</div>
		</div>
	);
}

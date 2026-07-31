import { useCallback } from 'react';

import { cn } from '@/utils/cn';
/**
 * 드롭다운되는 선택 항목들의 타입
 */
export interface OptionType {
	/** 옵션의 value (내부적으로 사용) */
	value: string | number;
	/** 사용자에게 표시될 텍스트 */
	text: string;
}

/**
 * BasicDropbox 컴포넌트의 Props 인터페이스
 */
interface BasicDropboxProps {
	/** 드롭다운에 표시될 옵션 목록 */
	options: OptionType[];
	/** 옵션 선택 시 호출되는 콜백 함수 */
	callbackOnclick: (value: string | number) => void;
	/** 드롭박스 컨테이너의 ref 객체 */
	ref?: React.RefObject<HTMLDivElement>;
	/** 드롭박스의 크기 여부 (true: 전체 너비, false: 110px 고정) */
	isLarge?: boolean;
	/** 현재 선택된 옵션의 value */
	selectedValue?: string | number;
	/** 드롭박스의 클래스명 */
	className?: string;
}

/**
 * 드롭다운 옵션 목록을 표시하는 컴포넌트
 *
 * @description
 * - SortButton 등의 선택 컴포넌트와 함께 사용
 * - 선택된 옵션은 하이라이트 표시됨
 * - 스크롤 가능한 옵션 리스트 제공
 *
 * @example
 * ```tsx
 * <BasicDropbox
 *   options={[
 *     { value: 'newest', text: '최신순' },
 *     { value: 'oldest', text: '오래된순' }
 *   ]}
 *   callbackOnclick={(value) => console.log(value)}
 *   selectedValue="newest"
 * />
 * ```
 */
export default function BasicDropbox({
	options = [],
	callbackOnclick,
	ref,
	isLarge = false,
	selectedValue = '',
	className
}: BasicDropboxProps) {
	const handleSelect = useCallback(
		(optionValue: string | number) => {
			callbackOnclick(optionValue);
		},
		[callbackOnclick]
	);

	return (
		<div
			ref={ref}
			className={cn(
				'z-floating bg-discord-surface absolute right-0 mt-2 max-h-60 overflow-y-auto rounded-lg border border-white/10 p-1 shadow-2xl',
				isLarge ? 'w-full' : 'w-48',
				className
			)}
			role="listbox"
			aria-label="옵션 목록">
			{options.map(option => (
				<button
					key={`${option.value}-${option.text}`}
					type="button"
					className={cn(
						'flex w-full cursor-pointer items-center rounded px-2 py-2 text-sm font-semibold transition-colors',
						selectedValue === option.value
							? 'bg-primary-500 text-discord-bg'
							: 'text-discord-muted hover:bg-primary-500/10 hover:text-primary-400'
					)}
					onClick={() => handleSelect(option.value)}
					role="option"
					aria-selected={selectedValue === option.value}>
					{option.text}
				</button>
			))}
		</div>
	);
}

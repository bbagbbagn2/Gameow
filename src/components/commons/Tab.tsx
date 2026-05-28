import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

/**
 * 글로우 효과가 있는 아이콘 컴포넌트
 */
function IconWithGlow({ iconUrl, isSelected }: { iconUrl: string; isSelected: boolean }) {
	const glowFilter = 'drop-shadow(0 0 4px #1ef5d7) drop-shadow(0 0 10px #1ef5d7)';

	return (
		<span
			className={`icon-glow-hover mb:h-5 mb:w-5 relative inline-block h-4 w-4 transition-all duration-200 ${
				isSelected ? 'icon-glow' : ''
			}`}
			style={isSelected ? { filter: glowFilter } : undefined}>
			<span
				className={`group-hover:bg-primary-400 mb:h-5 mb:w-5 block h-4 w-4 transition-colors duration-200 ${
					isSelected ? 'bg-white' : 'bg-gray-400/80'
				}`}
				style={{
					WebkitMaskImage: `url(${iconUrl})`,
					maskImage: `url(${iconUrl})`,
					WebkitMaskRepeat: 'no-repeat',
					maskRepeat: 'no-repeat',
					WebkitMaskPosition: 'center',
					maskPosition: 'center',
					WebkitMaskSize: 'contain',
					maskSize: 'contain'
				}}
			/>
		</span>
	);
}
/**
 * 탭 옵션의 타입 정의
 */
export interface TabOption {
	/** 탭의 고유 식별값 */
	value: string;
	/** 탭에 표시될 텍스트 */
	text: string;
	/** 탭에 표시될 아이콘 경로 */
	icon?: string;
}

/**
 * Tab 컴포넌트의 Props 인터페이스
 */
interface TabProps {
	/** 탭 옵션 목록 */
	options: TabOption[];
	/** 현재 선택된 탭의 value */
	selectedTab: string;
	/** 탭 변경 시 호출되는 콜백 함수 */
	onTabChange: (tabId: string) => void;
	/** 추가할 커스텀 CSS 클래스명 */
	className?: string;
}

/**
 * 애니메이션 인디케이터가 있는 탭 네비게이션 컴포넌트
 *
 * @description
 * - 선택된 탭 하단에 애니메이션 바 표시
 * - 아이콘과 텍스트를 함께 표시 가능
 * - 윈도우 리사이즈 시 인디케이터 위치 자동 조정
 * - 부드러운 전환 애니메이션 효과
 *
 * @example
 * ```tsx
 * <Tab
 *   options={[
 *     { value: 'all', text: '모두 보기', icon: '/icons/all.svg' },
 *     { value: 'active', text: '진행중', icon: '/icons/active.svg' }
 *   ]}
 *   selectedTab="all"
 *   onTabChange={(tabId) => console.log(tabId)}
 * />
 * ```
 */
export default function Tab({ options, selectedTab, onTabChange, className }: TabProps) {
	const [indicatorStyle, setIndicatorStyle] = useState<{
		left: number;
		width: number;
	}>({ left: 0, width: 0 });
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		const updateIndicator = () => {
			const selectedIndex = options.findIndex(option => option.value === selectedTab);
			if (selectedIndex !== -1 && tabRefs.current[selectedIndex]) {
				const selectedTabElement = tabRefs.current[selectedIndex];
				const containerRect = selectedTabElement.parentElement?.getBoundingClientRect();
				const tabRect = selectedTabElement.getBoundingClientRect();

				if (containerRect && tabRect) {
					setIndicatorStyle({
						left: tabRect.left - containerRect.left,
						width: tabRect.width
					});
				}
			}
		};

		updateIndicator();
		window.addEventListener('resize', updateIndicator);

		return () => window.removeEventListener('resize', updateIndicator);
	}, [selectedTab, options]);

	return (
		<div className={`relative border-b border-white/5 ${className}`}>
			<div className="flex gap-6">
				{options.map((option, index) => (
					<button
						key={option.value}
						ref={el => {
							tabRefs.current[index] = el;
						}}
						onClick={() => onTabChange(option.value)}
						className={cn(
							'relative flex cursor-pointer items-center gap-2 pb-3 text-sm transition-all duration-200',
							'group font-semibold',
							`${selectedTab === option.value ? 'text-white' : 'text-discord-muted hover:text-discord-text'}`
						)}>
						<span className="text-base">{option.text}</span>
						{option.icon && (
							<span
								className={cn(
									'h-4 w-4 transition-colors',
									selectedTab === option.value ? 'bg-primary-500' : 'bg-discord-muted group-hover:bg-discord-text'
								)}
								style={{
									WebkitMaskImage: `url(${option.icon})`,
									maskImage: `url(${option.icon})`,
									WebkitMaskRepeat: 'no-repeat',
									maskRepeat: 'no-repeat',
									WebkitMaskPosition: 'center',
									maskPosition: 'center',
									WebkitMaskSize: 'contain',
									maskSize: 'contain'
								}}
							/>
						)}
					</button>
				))}
			</div>

			{/* 애니메이션 막대 */}
			<div
				className="absolute bottom-0 h-0.5 bg-primary-500 transition-all duration-300 ease-out"
				style={{
					left: `${indicatorStyle.left}px`,
					width: `${indicatorStyle.width}px`
				}}
			/>
		</div>
	);
}


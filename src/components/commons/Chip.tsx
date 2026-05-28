import { cn } from "@/utils/cn";

/**
 * Chip 컴포넌트의 Props 인터페이스
 */
interface ChipProps {
	/** 칩에 표시될 텍스트 */
	text: string;
	imgUrl?: string;
	/** 칩의 활성화 상태 여부 (true: 어두운 배경, false: 밝은 배경) */
	isActive?: boolean;
	onClick?: () => void;
}

/**
 * 필터나 태그를 표시하는 칩 컴포넌트
 *
 * @description
 * - 선택 가능한 필터나 카테고리 표시에 사용
 * - 활성화 상태에 따라 배경색과 텍스트 색상이 변경됨
 * - 두 가지 크기 제공 (큰 사이즈, 작은 사이즈)
 *
 * @example
 * ```tsx
 * <Chip text="달램핏" isActive={true} isLarge={false} />
 * ```
 */
export default function Chip({ text, isActive = false, imgUrl, onClick }: ChipProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				'flex h-8 cursor-pointer items-center gap-2 rounded-md px-3 py-1 transition-all duration-200',
				isActive
					? 'bg-primary-500/10 text-primary-400 border border-primary-500/30'
					: 'bg-discord-surface text-discord-muted border border-white/5 hover:bg-discord-hover hover:text-discord-text'
			)}>
			{imgUrl && <img src={imgUrl} alt="" className="h-4 w-4" />}
			<span className="text-sm font-bold tracking-tight">{text}</span>
		</button>
	);
}


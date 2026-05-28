import Image from 'next/image';
import { PROFILE_PATHS } from '@/constants/assetPath';

interface NoDataMessageProps {
	/** 사용자에게 표시할 메시지 텍스트 */
	text: string;
}

/**
 * 데이터가 없을 때 표시하는 공통 UI 컴포넌트
 * @component
 */
export default function NoDataMessage({ text }: NoDataMessageProps) {
	return (
		<div className="flex min-h-[200px] flex-1 flex-col items-center justify-center gap-4 opacity-50">
			<Image src={PROFILE_PATHS.NO_DATA_SRC} alt="데이터 없음" width={120} height={100} className="grayscale" />
			<p className="text-discord-muted text-base font-medium">{text}</p>
		</div>
	);
}


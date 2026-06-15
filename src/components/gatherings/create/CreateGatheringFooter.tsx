'use client';

import BasicButton from '@/components/commons/basic/BasicButton';
import { Step } from '@/stores/useFunnelStore';

interface CreateGatheringFooterProps {
	step: Step;
	isPending: boolean;
	onNext: () => void;
	onPrev: () => void;
}

export default function CreateGatheringFooter({ step, isPending, onNext, onPrev }: CreateGatheringFooterProps) {
	return (
		<footer className="bg-discord-card/30 max-mb:flex-col flex flex-row gap-2 border-t border-white/5 px-6 py-5">
			{step > 1 && (
				<BasicButton type="button" onClick={onPrev} outlined className="w-full">
					이전
				</BasicButton>
			)}

			{step < 4 ? (
				<BasicButton type="button" onClick={onNext} className="w-full">
					다음
				</BasicButton>
			) : (
				<BasicButton type="submit" isActive={!isPending} className="w-full">
					{isPending ? '등록 중...' : '크루 생성하기'}
				</BasicButton>
			)}
		</footer>
	);
}

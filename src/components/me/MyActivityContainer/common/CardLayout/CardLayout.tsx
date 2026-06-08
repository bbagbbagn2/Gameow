import { ReactNode } from 'react';
import Image from 'next/image';

import type { Gathering, JoinedGathering } from '@/types/response/gatherings';
import { formatKoreanDate } from '@/utils/date';

interface GatheringProps {
	/** 표시할 모임 객체 */
	gathering: JoinedGathering | Gathering;

	/** 카드에 표시할 뱃지 또는 추가 컨텐츠 */
	badgeContent?: ReactNode;

	/** 카드 내부 하단에 표시할 추가 컨텐츠 (버튼 등) */
	children?: ReactNode;
}

/**
 * 모임 카드 레이아웃 컴포넌트
 * - 모임 이미지, 이름, 장소, 날짜/시간, 인원 정보 표시
 * - badgeContent와 children을 통해 확장 가능
 */
export default function CardLayout({ gathering, badgeContent, children }: GatheringProps) {
	const { location } = gathering;
	let genre = '';
	switch (location) {
		case '건대입구':
			genre = 'AOS';
			break;
		case '을지로3가':
			genre = 'Adventure';
			break;
		case '신림':
			genre = 'FPS';
			break;
		case '홍대입구':
			genre = 'RPG';
			break;
	}
	return (
		<article
			key={gathering.id}
			className="bg-discord-card hover:bg-discord-hover group relative flex flex-col overflow-hidden rounded-xl border border-white/5 transition-all hover:-translate-y-1 hover:shadow-2xl">
			{/* 모임 이미지 (상단 배치) */}
			<div className="relative h-48 w-full shrink-0 overflow-hidden shadow-inner">
				<Image
					src={gathering.image}
					alt="모임 이미지"
					fill
					className="object-cover transition-transform duration-700 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

				{/* 이미지 위 배지 */}
				<div className="absolute top-3 right-3">{badgeContent}</div>

				{/* 이미지 위 장르 태그 */}
				<div className="absolute bottom-3 left-3">
					<span className="bg-primary-500 text-discord-bg rounded px-2 py-0.5 text-[10px] font-black tracking-wider uppercase">
						{genre}
					</span>
				</div>
			</div>

			{/* 모임 정보 (하단 배치) */}
			<div className="flex flex-1 flex-col p-5">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1">
						<h3
							className="group-hover:text-primary-400 text-lg font-bold text-white transition-colors"
							id={`gathering-title-${gathering.id}`}>
							{gathering.name}
						</h3>
						<div className="flex items-center gap-2 text-xs">
							<span className="text-primary-500 font-bold tracking-tighter uppercase">
								{formatKoreanDate(gathering.dateTime)}
							</span>
							<span className="text-discord-muted">•</span>
							<span className="text-discord-muted font-semibold">{location}</span>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<div className="bg-discord-bg flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold">
							<Image src="/icons/person.svg" alt="인원" width={12} height={12} className="opacity-60" />
							<span className="text-discord-text">
								{gathering.participantCount} / {gathering.capacity}
							</span>
						</div>
						{gathering.participantCount >= gathering.capacity && (
							<span className="text-destructive text-[10px] font-black uppercase italic">Full House</span>
						)}
					</div>
				</div>

				<div className="mt-6 flex items-center gap-2">{children}</div>
			</div>
		</article>
	);
}

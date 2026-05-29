import Image from 'next/image';
import { formatKoreanDate } from '@/utils/date';
import type { ReviewResponse } from '@/types/response/reviews';

interface WrittenReviewCardProps {
	/** 렌더링할 리뷰 객체 */
	review: ReviewResponse;
}

/**
 * WrittenReviewCard 컴포넌트
 *
 * 사용자가 작성한 리뷰 항목을 카드 형태로 렌더링합니다.
 * 카드에는 다음 항목이 포함됩니다:
 * - 모임 이미지
 * - 평점(하트 아이콘, 5단계)
 * - 리뷰 코멘트
 * - 모임 이름 및 위치
 * - 모임 날짜 (yyyy.MM.dd 포맷)
 *
 * 접근성:
 * - 평점 하트 아이콘의 `alt` 텍스트는 활성/비활성 상태를 구분하여 제공됩니다.
 * - 날짜/텍스트는 시각적 정보 외에도 스크린리더가 읽을 수 있는 텍스트로 제공됩니다.
 *
 * @component
 * @param {WrittenReviewCardProps} props - 컴포넌트 props
 * @param {ReviewResponse} props.review - 렌더링할 리뷰 객체
 * @returns {JSX.Element} 리뷰 카드 엘리먼트
 *
 * @example
 * <WrittenReviewCard review={reviewItem} />
 *
 * @notes
 * - `formatKoreanDate` 유틸로 모임 일시를 `yyyy.MM.dd` 형식으로 표시합니다.
 */
import { GENRE_BY_LOCATION, Location } from '@/constants/options';
import { PROFILE_PATHS } from '@/constants/assetPath';

export default function WrittenReviewCard({ review }: WrittenReviewCardProps) {
	const genre = review.Gathering.location 
		? GENRE_BY_LOCATION[review.Gathering.location as Location] 
		: '';

	return (
		<div className="bg-discord-surface group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/5 p-6 shadow-xl transition-all duration-300 hover:border-primary-500/30 hover:shadow-primary-500/10 tb:flex-row">
			{/* Discord Embed-like Accent Bar */}
			<div className="bg-primary-500 absolute top-0 left-0 h-full w-1 opacity-0 transition-opacity group-hover:opacity-100" />
			
			{/* 모임 이미지 */}
			<div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl border border-white/5 tb:w-64">
				<Image
					src={review.Gathering.image || '/images/example1.jpg'}
					alt="Gathering"
					fill
					className="object-cover transition-transform duration-700 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
				<div className="absolute bottom-3 left-3">
					<span className="bg-primary-500/90 text-discord-bg backdrop-blur-sm rounded px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em]">
						{genre}
					</span>
				</div>
			</div>

			{/* 리뷰 정보 */}
			<div className="flex flex-1 flex-col justify-between py-1">
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						{/* 별점(하트) */}
						<div className="flex gap-1.5">
							{Array.from({ length: 5 }).map((_, i) => (
								<Image
									key={i}
									src={i < review.score ? '/icons/heart_active.svg' : '/icons/heart.svg'}
									alt="heart"
									width={20}
									height={20}
									className={i >= review.score ? 'opacity-10 grayscale brightness-0 invert' : 'drop-shadow-[0_0_8px_rgba(95,247,230,0.3)]'}
								/>
							))}
						</div>
						<span className="text-discord-muted text-xs font-bold tabular-nums tracking-wider uppercase">
							{formatKoreanDate(review.createdAt || '', 'yyyy.MM.dd')}
						</span>
					</div>

					<div className="flex flex-col gap-3">
						<h4 className="text-primary-400 text-sm font-black tracking-widest uppercase">
							{review.Gathering.name}
						</h4>
						<p className="text-discord-text text-lg font-medium leading-relaxed tracking-tight group-hover:text-white transition-colors">
							"{review.comment}"
						</p>
					</div>
				</div>

				<div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5">
					<div className="flex items-center gap-2">
						<span className="text-discord-muted text-[10px] font-bold uppercase tracking-[0.2em]">Activity Record</span>
						<span className="text-discord-muted opacity-30">•</span>
						<span className="text-white text-xs font-bold">{review.Gathering.location}</span>
					</div>
					
					<div className="flex h-8 w-8 items-center justify-center rounded-md opacity-0 transition-opacity group-hover:bg-white/5 group-hover:opacity-100">
						<div className="flex gap-1">
							<div className="size-1 rounded-full bg-discord-muted" />
							<div className="size-1 rounded-full bg-discord-muted" />
							<div className="size-1 rounded-full bg-discord-muted" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


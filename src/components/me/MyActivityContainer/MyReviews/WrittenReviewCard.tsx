import Image from 'next/image';

import { GENRE_BY_LOCATION, Location } from '@/constants/options';
import type { ReviewResponse } from '@/types/response/reviews';
import { formatKoreanDate } from '@/utils/date';

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

export default function WrittenReviewCard({ review }: WrittenReviewCardProps) {
	const genre = review.Gathering.location ? GENRE_BY_LOCATION[review.Gathering.location as Location] : '';

	return (
		<article className="bg-discord-card hover:bg-discord-hover group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5 transition-all hover:-translate-y-1 hover:shadow-2xl">
			{/* 상단 이미지 영역 */}
			<div className="relative h-48 w-full shrink-0 overflow-hidden shadow-inner">
				<Image
					src={review.Gathering.image || '/images/example1.jpg'}
					alt="Gathering"
					fill
					className="object-cover transition-transform duration-700 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

				{/* 장르 태그 */}
				<div className="absolute bottom-3 left-3">
					<span className="bg-primary-500 text-discord-bg rounded px-2 py-0.5 text-[10px] font-black tracking-wider uppercase">
						{genre}
					</span>
				</div>

				{/* 날짜 태그 */}
				<div className="absolute top-3 right-3">
					<span className="bg-discord-bg/80 text-discord-text rounded-md border border-white/10 px-2 py-1 text-[10px] font-bold tabular-nums backdrop-blur-md">
						{formatKoreanDate(review.createdAt || '', 'yyyy.MM.dd')}
					</span>
				</div>
			</div>

			{/* 하단 정보 영역 */}
			<div className="flex flex-1 flex-col p-5">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						{/* 별점(하트) */}
						<div className="flex gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<Image
									key={i}
									src={i < review.score ? '/icons/heart_active.svg' : '/icons/heart.svg'}
									alt="heart"
									width={16}
									height={16}
									className={
										i >= review.score
											? 'opacity-10 brightness-0 grayscale invert'
											: 'drop-shadow-[0_0_8px_rgba(95,247,230,0.3)]'
									}
								/>
							))}
						</div>
						<h4 className="text-primary-400 line-clamp-1 text-xs font-black tracking-widest uppercase">
							{review.Gathering.name}
						</h4>
					</div>

					<p className="text-discord-text line-clamp-3 min-h-[4.5rem] flex-1 text-base leading-relaxed font-medium tracking-tight transition-colors group-hover:text-white">
						{review.comment}
					</p>

					<div className="mt-2 flex items-center justify-between border-t border-white/5 pt-4">
						<div className="flex items-center gap-2">
							<span className="text-discord-muted text-[10px] font-bold tracking-[0.2em] uppercase">
								Activity Record
							</span>
							<span className="text-discord-muted opacity-30">•</span>
							<span className="text-xs font-bold text-white">{review.Gathering.location}</span>
						</div>

						<div className="flex h-6 w-6 items-center justify-center rounded-md opacity-0 transition-opacity group-hover:bg-white/5 group-hover:opacity-100">
							<div className="flex gap-0.5">
								<div className="bg-discord-muted size-0.5 rounded-full" />
								<div className="bg-discord-muted size-0.5 rounded-full" />
								<div className="bg-discord-muted size-0.5 rounded-full" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

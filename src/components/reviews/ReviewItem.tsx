import Image from 'next/image';
import { formatKoreanDate } from '@/utils/date';
import { ReviewResponse } from '@/types/response/reviews';
import { GENRE_BY_LOCATION, Location } from '@/constants/options';
import { PROFILE_PATHS } from '@/constants/assetPath';

/**
 * 리뷰 카드 컴포넌트
 * - 모임 이미지, 리뷰 점수(하트), 리뷰 내용, 모임 정보, 작성자 ID, 작성일 표시
 * - 모든 리뷰 페이지에서 사용
 * - 작성일은 `yyyy.MM.dd` 형식으로 표시됨
 *
 * @param {Object} props - 컴포넌트 props
 * @param {JoinedGathering} props.gathering - 리뷰가 작성된 모임 정보
 *
 * @example
 * <WrittenReviewCard gathering={gatheringData} />
 */
export default function ReviewItem({ reviewData }: { reviewData: ReviewResponse | null }) {
	const genre = reviewData?.Gathering?.location ? GENRE_BY_LOCATION[reviewData.Gathering.location as Location] : '';

	return (
		<article className="bg-discord-card hover:bg-discord-hover group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5 transition-all hover:-translate-y-1 hover:shadow-2xl">
			{/* 상단 이미지 영역 */}
			<div className="relative h-48 w-full shrink-0 overflow-hidden shadow-inner">
				<Image
					src={reviewData?.Gathering?.image || '/images/example1.jpg'}
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

				{/* 날짜 태그 (이미지 위 배치) */}
				<div className="absolute top-3 right-3">
					<span className="bg-discord-bg/80 text-discord-text rounded-md border border-white/10 px-2 py-1 text-[10px] font-bold tabular-nums backdrop-blur-md">
						{formatKoreanDate(reviewData?.createdAt || '', 'yyyy.MM.dd')}
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
									src={i < (reviewData?.score || 0) ? '/icons/heart_active.svg' : '/icons/heart.svg'}
									alt="heart"
									width={16}
									height={16}
									className={
										i >= (reviewData?.score || 0)
											? 'opacity-10 brightness-0 grayscale invert'
											: 'drop-shadow-[0_0_8px_rgba(95,247,230,0.3)]'
									}
								/>
							))}
						</div>
						<h4 className="text-primary-400 line-clamp-1 text-xs font-black tracking-widest uppercase">
							{reviewData?.Gathering?.name}
						</h4>
					</div>

					<p className="text-discord-text line-clamp-3 min-h-[4.5rem] flex-1 text-base leading-relaxed font-medium tracking-tight transition-colors group-hover:text-white">
						{reviewData?.comment}
					</p>

					{/* 작성자 정보 (Discord 멤버 스타일) */}
					<div className="mt-2 flex items-center justify-between border-t border-white/5 pt-4">
						<div className="flex items-center gap-2.5">
							<div className="bg-discord-bg relative h-8 w-8 overflow-hidden rounded-full border border-white/10">
								<Image
									src={reviewData?.User?.image || PROFILE_PATHS.DEFAULT_PROFILE_SRC}
									alt="Profile"
									fill
									className="object-cover"
								/>
							</div>
							<div className="flex flex-col">
								<span className="text-xs font-black tracking-tight text-white">{reviewData?.User?.name}</span>
								<span className="text-discord-muted text-[9px] font-bold tracking-[0.1em] uppercase">
									Verified Member
								</span>
							</div>
						</div>

						{/* Discord-like "More" button placeholder */}
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

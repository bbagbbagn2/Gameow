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
	const genre = reviewData?.Gathering?.location 
		? GENRE_BY_LOCATION[reviewData.Gathering.location as Location] 
		: '';

	return (
		<div className="bg-discord-surface group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/5 p-6 shadow-xl transition-all duration-300 hover:border-primary-500/30 hover:shadow-primary-500/10 tb:flex-row">
			{/* Discord Embed-like Accent Bar */}
			<div className="bg-primary-500 absolute top-0 left-0 h-full w-1 opacity-0 transition-opacity group-hover:opacity-100" />
			
			{/* 모임 이미지 */}
			<div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl border border-white/5 tb:w-64">
				<Image
					src={reviewData?.Gathering?.image || '/images/example1.jpg'}
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
									src={i < (reviewData?.score || 0) ? '/icons/heart_active.svg' : '/icons/heart.svg'}
									alt="heart"
									width={20}
									height={20}
									className={i >= (reviewData?.score || 0) ? 'opacity-10 grayscale brightness-0 invert' : 'drop-shadow-[0_0_8px_rgba(95,247,230,0.3)]'}
								/>
							))}
						</div>
						<span className="text-discord-muted text-xs font-bold tabular-nums tracking-wider uppercase">
							{formatKoreanDate(reviewData?.createdAt || '', 'yyyy.MM.dd')}
						</span>
					</div>

					<div className="flex flex-col gap-3">
						<h4 className="text-primary-400 text-sm font-black tracking-widest uppercase">
							{reviewData?.Gathering?.name}
						</h4>
						<p className="text-discord-text text-lg font-medium leading-relaxed tracking-tight group-hover:text-white transition-colors">
							"{reviewData?.comment}"
						</p>
					</div>
				</div>

				{/* 유저 정보 */}
				<div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5">
					<div className="flex items-center gap-3">
						<div className="bg-discord-bg group-hover:border-primary-500/50 relative h-10 w-10 overflow-hidden rounded-full border border-white/10 transition-colors">
							<Image
								src={reviewData?.User?.image || PROFILE_PATHS.DEFAULT_PROFILE_SRC}
								alt="Profile"
								fill
								className="object-cover"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-white text-sm font-black tracking-tight">{reviewData?.User?.name}</span>
							<span className="text-discord-muted text-[10px] font-bold uppercase tracking-[0.2em]">Verified Member</span>
						</div>
					</div>
					
					{/* Discord-like "More" button placeholder or similar aesthetic element */}
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



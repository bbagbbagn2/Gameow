import { scoreData } from '@/types/response/reviews';
import { useMemo } from 'react';
import ScoreSkeleton from './ScoreSkeleton';

/**
 * 리뷰 점수 섹션 컴포넌트
 * - 평균 점수(0~5)와 각 점수대(5~1점)의 분포를 표시
 * - 리뷰 점수 집계 데이터를 하트 아이콘과 막대 그래프로 시각화
 *
 * @param {{ data?: scoreData | null }} props
 *
 * @returns {JSX.Element}
 */
export default function ScoreSection({ data, isLoading }: { data?: scoreData | null; isLoading?: boolean }) {
	const heartFillPercent = useMemo(() => {
		const avg = data?.averageScore ?? 0;
		const clamped = Math.max(0, Math.min(5, avg));
		return (clamped / 5) * 100;
	}, [data?.averageScore]);

	const totalCount = useMemo(
		() => (data ? data.fiveStars + data.fourStars + data.threeStars + data.twoStars + data.oneStar : 0),
		[data]
	);

	const scores = [
		{ label: '5점', value: data?.fiveStars ?? 0 },
		{ label: '4점', value: data?.fourStars ?? 0 },
		{ label: '3점', value: data?.threeStars ?? 0 },
		{ label: '2점', value: data?.twoStars ?? 0 },
		{ label: '1점', value: data?.oneStar ?? 0 }
	];

	if (isLoading) {
		return <ScoreSkeleton />;
	}

	return (
		<div className="tb:flex-row tb:items-center tb:justify-between flex flex-col gap-10">
			{/* 평균 점수 영역 */}
			<div className="tb:items-start tb:pl-4 flex flex-col items-center gap-4">
				<div className="tb:items-start flex flex-col items-center">
					<span className="text-primary-500 text-xs font-black tracking-[0.2em] uppercase">Average Rating</span>
					<div className="mt-1 flex items-baseline gap-2">
						<span className="text-5xl font-black text-white">{data?.averageScore?.toFixed(1) ?? '0.0'}</span>
						<span className="text-discord-muted text-lg font-bold">/ 5.0</span>
					</div>
				</div>

				<div className="relative h-6 w-40">
					{/* Base layer */}
					<div className="flex gap-1">
						{Array.from({ length: 5 }).map((_, i) => (
							<img
								key={i}
								src="/icons/heart.svg"
								alt="heart"
								className="h-6 w-6 opacity-20 brightness-0 grayscale invert"
							/>
						))}
					</div>
					{/* Overlay layer */}
					<div
						className="absolute top-0 left-0 overflow-hidden transition-all duration-700 ease-out"
						style={{ width: `${heartFillPercent}%` }}>
						<div className="flex gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<img key={i} src="/icons/heart_active.svg" alt="heart active" className="h-6 w-6" />
							))}
						</div>
					</div>
				</div>
				<p className="text-discord-muted text-xs font-medium">Total {totalCount.toLocaleString()} reviews</p>
			</div>

			{/* 점수 분포 영역 */}
			<div className="pc:max-w-md flex flex-1 flex-col gap-3">
				{scores.map((score, i) => (
					<div key={i} className="group flex items-center gap-4">
						<span className="text-discord-muted w-8 text-right text-xs font-black tracking-tighter transition-colors group-hover:text-white">
							{score.label}
						</span>
						<div className="bg-discord-bg relative h-2 flex-1 overflow-hidden rounded-full border border-white/5 shadow-inner">
							<div
								className="bg-primary-500 absolute top-0 left-0 h-full rounded-full shadow-[0_0_12px_rgba(95,247,230,0.3)] transition-all duration-1000 ease-out"
								style={{ width: `${totalCount > 0 ? (score.value / totalCount) * 100 : 0}%` }}
							/>
						</div>
						<span className="text-discord-muted group-hover:text-primary-400 w-10 text-xs font-bold transition-colors">
							{score.value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

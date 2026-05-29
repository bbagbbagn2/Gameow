'use client';
// 마이페이지
import Image from 'next/image';
import Tab from '@/components/commons/Tab';
import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Chip from '@/components/commons/Chip';
import ScoreSection from '@/components/reviews/ScoreSection';
import { getReviews } from '@/apis/reviews/reviews';
import { GetReviewsResponse, scoreData } from '@/types/response/reviews';
import { getScores } from '@/apis/reviews/scores';
import { GatheringType } from '@/types/response/gatherings';
import ReviewSection from '@/components/reviews/ReviewSection';
import { FilterData } from '@/components/reviews/FilterSection';
import { SUB_TYPE_OPTIONS, TYPE_OPTIONS } from '@/constants/options';
import { REVIEWS_MESSAGE } from '@/constants/messages';
import { cn } from '@/utils/cn';

/**
 * 빈 값들을 제거한 필터 객체를 반환하는 헬퍼 함수
 */
const setReviewParams = (filterValues: FilterData): Record<string, string> => {
	return Object.entries(filterValues).reduce(
		(acc, [key, value]) => {
			if (value && value !== '') {
				acc[key] = value;
			}
			return acc;
		},
		{} as Record<string, string>
	);
};

/**
 * `Reviews` 컴포넌트
 *
 * 모든 리뷰 화면을 보여줍니다.
 * - 상단 제목("마이페이지")을 표시합니다.
 * - 카테고리별로 정렬 가능합니다.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function Reviews() {
	const [activeTab, setActiveTab] = useState('DALLAEMFIT');
	const [selectedCategory, setSelectedCategory] = useState<GatheringType>('DALLAEMFIT');
	const [filterValues, setFilterValues] = useState<FilterData>({});
	const [currentPage, setCurrentPage] = useState(1);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	const handleFilterChange = useCallback(
		(filter: FilterData) => {
			if (JSON.stringify(filterValues) !== JSON.stringify(filter)) {
				setFilterValues(filter);
			}
		},
		[filterValues]
	);

	const iconMap = {
		OFFICE_STRETCHING: '/icons/steam_logo.svg',
		MINDFULNESS: '/icons/online.svg'
	} as const;

	const handlePageChange = useCallback((page: number) => {
		setCurrentPage(page);
	}, []);

	const {
		data: scores,
		isLoading: isLoadingScores
	} = useQuery({
		queryKey: ['scores', selectedCategory],
		queryFn: () => getScores({ type: selectedCategory })
	});

	const scoreData: scoreData | null = scores && scores.length > 0 ? scores[0] : null;

	const {
		data: reviewsData,
		isLoading: isLoadingReviews
	} = useQuery({
		queryKey: ['reviews', selectedCategory, filterValues, currentPage],
		queryFn: () =>
			getReviews({
				type: selectedCategory,
				sortOrder: 'desc',
				offset: (currentPage - 1) * 10,
				...setReviewParams(filterValues)
			}),
		placeholderData: prev => prev
	});

	if (!isHydrated) return null;

	return (
		<div className="bg-discord-bg min-h-screen">
			<div className="tb:px-6 tb:pt-12 pc:max-w-300 pc:px-25 m-auto flex w-full flex-col px-4 pt-8 pb-20">
				{/* 히어로 섹션 - Discord 스타일 */}
				<section className="bg-discord-surface relative mb-12 overflow-hidden rounded-2xl border border-white/5 p-8 shadow-2xl tb:p-12">
					<div className="bg-primary-500/10 absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl" />

					<div className="relative flex flex-col items-start gap-8 pc:flex-row pc:items-center">
						<div className="bg-discord-bg flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/10 shadow-2xl">
							<Image
								priority
								src="/images/review.svg"
								alt="Review"
								width={56}
								height={56}
								className="brightness-0 invert opacity-80"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-primary-400 text-xs font-black tracking-[0.3em] uppercase">Feedback</span>
							<h2 className="text-3xl font-black tracking-tighter text-white tb:text-4xl">
								{REVIEWS_MESSAGE.subtitle.split(' ').map((word, i) => (
									<span key={i} className={i === 1 ? 'text-primary-500 underline decoration-primary-500/30 underline-offset-8' : ''}>
										{word}{' '}
									</span>
								))}
							</h2>
							<p className="text-discord-muted mt-2 max-w-2xl text-base font-medium leading-relaxed">
								{REVIEWS_MESSAGE.title} - 크루원들의 생생한 후기를 확인하고 다음 전장을 준비하세요.
							</p>
						</div>
					</div>
				</section>

				<div className="flex flex-col gap-10">
					{/* 카테고리 탭 영역 */}
					<div className="flex flex-col gap-6">
						<Tab
							options={TYPE_OPTIONS}
							selectedTab={activeTab}
							onTabChange={(tabId: string) => {
								if (tabId === 'DALLAEMFIT') {
									setSelectedCategory('DALLAEMFIT');
								} else if (tabId === 'WORKATION') {
									setSelectedCategory('WORKATION');
								}
								setActiveTab(tabId);
							}}
						/>
						
						<div className="flex flex-wrap gap-2">
							{activeTab === 'DALLAEMFIT' ? (
								SUB_TYPE_OPTIONS.map(({ value, text }) => (
									<Chip
										key={value}
										text={text}
										isActive={selectedCategory === value}
										imgUrl={iconMap[value as keyof typeof iconMap]}
										onClick={() => setSelectedCategory(value as GatheringType)}
									/>
								))
							) : (
								<Chip text="전체" isActive />
							)}
						</div>
					</div>

					{/* 리뷰 점수 요약 영역 */}
					<div className="bg-discord-surface rounded-2xl border border-white/5 p-6 shadow-xl tb:p-8">
						<ScoreSection data={scoreData} isLoading={isLoadingScores} />
					</div>

					{/* 리뷰 리스트 영역 */}
					<div className="flex flex-col gap-6">
						<ReviewSection
							reviewData={reviewsData}
							isLoading={isLoadingReviews}
							callbackOnFilterChange={handleFilterChange}
							callBackOnPageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}


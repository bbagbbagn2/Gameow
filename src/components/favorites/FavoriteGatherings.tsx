'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getGatherings } from '@/apis/gatherings';
import { useWishlistStore } from '@/stores/wishlist';
import { LIKED_GATHERING_MESSAGE } from '@/constants/messages';
import type { GatheringType } from '@/types/response/gatherings';
import { TYPE_OPTIONS } from '@/constants/options';

import * as motion from 'motion/react-client';
import Image from 'next/image';
import Tab from '../commons/Tab';
import Chip from '../commons/Chip';
import CardList from './cardList/CardList';
import BasicPagination from '../commons/basic/BasicPagination';
import CardSkeleton from '@/app/(home)/CardSkeleton';

const ITEMS_PER_PAGE = 4;

export default function FavoriteGatherings() {
	const [selectedTab, setSelectedTab] = useState<'DALLAEMFIT' | 'WORKATION'>('DALLAEMFIT');
	const [selectedChip, setSelectedChip] = useState<GatheringType>('DALLAEMFIT');
	const [pageState, setPageState] = useState({ DALLAEMFIT: 1, WORKATION: 1 });

	const { wishlist, hasHydrated } = useWishlistStore();
	const router = useRouter();

	const { data: favoriteGatherings = [], isLoading } = useQuery({
		queryKey: ['favoriteGatherings', Array.from(wishlist)],
		queryFn: async () => {
			if (!hasHydrated || wishlist.size === 0) return [];
			const ids = Array.from(wishlist).join(',');
			return await getGatherings(`id=${ids}`);
		},
		placeholderData: keepPreviousData
	});

	const filteredGatherings = useMemo(() => {
		if (!hasHydrated) return [];
		const wishlistIds = Array.from(wishlist);
		const likedGatherings = favoriteGatherings.filter(g => wishlistIds.includes(g.id));

		const result = likedGatherings.filter(
			g => {
				if (selectedTab === 'WORKATION') return g.type === 'WORKATION';
				if (selectedTab === 'DALLAEMFIT') {
					if (selectedChip === 'DALLAEMFIT') return g.type !== 'WORKATION';
					if (selectedChip === 'OFFICE_STRETCHING') return g.type === 'OFFICE_STRETCHING';
					if (selectedChip === 'MINDFULNESS') return g.type === 'MINDFULNESS';
				}
				return false;
			},
			[hasHydrated]
		);

		return result.sort((a, b) => {
			const now = new Date();
			const aEndDate = new Date(a.registrationEnd);
			const bEndDate = new Date(b.registrationEnd);
			const aIsExpired = aEndDate < now;
			const bIsExpired = bEndDate < now;
			if (aIsExpired === bIsExpired) return aEndDate.getTime() - bEndDate.getTime();
			return aIsExpired ? 1 : -1;
		});
	}, [favoriteGatherings, wishlist, selectedTab, selectedChip]);

	const currentPage = pageState[selectedTab];
	const totalPages = Math.ceil(filteredGatherings.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedGatherings = filteredGatherings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	const handlePageChange = (page: number) => {
		setPageState(prev => ({ ...prev, [selectedTab]: page }));
	};

	if (!hasHydrated) {
		return (
			<div className="tb:px-6 tb:pt-12 pc:max-w-300 pc:px-25 mx-auto flex w-full flex-col px-4 pt-8 pb-20">
				<div className="bg-discord-surface h-64 w-full animate-pulse rounded-2xl" />
				<div className="tb:grid-cols-2 pc:grid-cols-3 mt-12 grid grid-cols-1 gap-6">
					{Array.from({ length: 3 }).map((_, idx) => (
						<CardSkeleton key={idx} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="tb:px-6 tb:pt-12 pc:max-w-300 pc:px-25 mx-auto flex w-full flex-col px-4 pt-8 pb-20">
			<h1 className="sr-only">찜한 크루 페이지</h1>

			{/* 히어로 섹션 */}
			<section className="bg-discord-surface tb:p-12 relative mb-12 overflow-hidden rounded-2xl border border-white/5 p-8 shadow-2xl">
				<div className="bg-highlight/10 absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl" />

				<div className="pc:flex-row pc:items-center relative flex flex-col items-start gap-8">
					<div className="bg-discord-bg flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/10 shadow-2xl">
						<Image
							priority
							src="/icons/favorite_cat.svg"
							alt="Favorite"
							width={56}
							height={56}
							className="opacity-80 brightness-0 invert"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<span className="text-highlight text-xs font-black tracking-[0.3em] uppercase">Collection</span>
						<h2 className="tb:text-4xl text-3xl font-black tracking-tighter text-white">
							언제나 함께할{' '}
							<span className="text-primary-500 decoration-primary-500/30 underline underline-offset-8">준비 완료</span>
						</h2>
						<p className="text-discord-muted mt-2 max-w-2xl text-base leading-relaxed font-medium">
							{LIKED_GATHERING_MESSAGE.subTitle}
						</p>
					</div>
				</div>
			</section>

			<div className="flex flex-col gap-10">
				{/* 탭 및 필터 영역 */}
				<div className="flex flex-col gap-6">
					<Tab
						options={TYPE_OPTIONS}
						selectedTab={selectedTab}
						onTabChange={tabValue => {
							setSelectedTab(tabValue as 'DALLAEMFIT' | 'WORKATION');
							setSelectedChip('DALLAEMFIT');
							setPageState(prev => ({ ...prev, [tabValue]: 1 }));
						}}
					/>

					<div className="flex flex-wrap gap-2">
						{selectedTab === 'DALLAEMFIT' ? (
							<>
								<Chip
									text="전체"
									isActive={selectedChip === 'DALLAEMFIT'}
									onClick={() => setSelectedChip('DALLAEMFIT')}
								/>
								<Chip
									text="스팀"
									imgUrl="/icons/steam_logo.svg"
									isActive={selectedChip === 'OFFICE_STRETCHING'}
									onClick={() => setSelectedChip('OFFICE_STRETCHING')}
								/>
								<Chip
									text="온라인"
									imgUrl="/icons/online.svg"
									isActive={selectedChip === 'MINDFULNESS'}
									onClick={() => setSelectedChip('MINDFULNESS')}
								/>
							</>
						) : (
							<Chip text="전체" isActive />
						)}
					</div>
				</div>

				{/* 그리드 리스트 영역 */}
				<div className="flex flex-col gap-8">
					{isLoading ? (
						<div className="tb:grid-cols-2 pc:grid-cols-3 grid grid-cols-1 gap-6">
							{Array.from({ length: 3 }).map((_, idx) => (
								<CardSkeleton key={idx} />
							))}
						</div>
					) : paginatedGatherings.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-discord-surface flex min-h-[400px] flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-12 text-center">
							<div className="bg-discord-bg mb-6 flex h-20 w-20 items-center justify-center rounded-full opacity-20">
								<Image src="/images/no_data.svg" alt="No Data" width={48} height={48} className="grayscale" />
							</div>
							<p className="text-discord-text text-xl font-bold">찜한 크루가 하나도 없어요</p>
							<p className="text-discord-muted mt-2 text-base">
								관심 있는 크루를 발견하면 하트를 눌러보세요. 나중에 여기서 빠르게 확인할 수 있습니다!
							</p>
							<button
								onClick={() => router.push('/')}
								className="bg-primary-500 text-discord-bg hover:bg-primary-400 mt-8 rounded-md px-6 py-3 text-sm font-black uppercase transition-all active:scale-95">
								Discover Crews
							</button>
						</motion.div>
					) : (
						<div className="tb:grid-cols-2 pc:grid-cols-3 grid grid-cols-1 gap-6">
							{paginatedGatherings.map(gathering => (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									key={gathering.id}
									onClick={() => router.push(`/gatherings/${gathering.id}`)}
									className="cursor-pointer">
									<CardList data={gathering} />
								</motion.div>
							))}
						</div>
					)}

					{/* 페이지네이션 */}
					{totalPages > 1 && (
						<div className="mt-12 flex justify-center">
							<BasicPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

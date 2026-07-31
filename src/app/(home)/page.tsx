'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import Image from 'next/image';

import * as motion from 'motion/react-client';

import GatheringFilterBar, { type FilterCriteria } from '@/app/(home)/GatheringFilterBar';
import { useInfiniteGatheringsQuery } from '@/hooks/useInfiniteGatheringsQuery';
import { Gathering } from '@/types/response/gatherings';
import { getGatheringQuery } from '@/utils/query';

import CardList from './CardList';
import CardSkeleton from './CardSkeleton';

const SKELETON_ITEMS = Array.from({ length: 3 }, (_, i) => i);

export default function HomePage() {
	const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
		type: '',
		location: '',
		date: undefined,
		sort: 'newest'
	});

	const deferredFilter = useDeferredValue(filterCriteria);
	const queryString = useMemo(() => getGatheringQuery(deferredFilter), [deferredFilter]);
	const { data, isLoading, ref, hasData, isEmpty } = useInfiniteGatheringsQuery(queryString);

	return (
		<div className="bg-discord-bg min-h-screen">
			<div className="tb:px-6 tb:pt-12 pc:max-w-300 pc:px-25 m-auto flex w-full flex-col px-4 pt-8 pb-20">
				<h1 className="sr-only">Gameow 크루 찾기 페이지</h1>

				{/* 히어로 섹션 */}
				<section className="bg-discord-surface tb:p-12 relative mb-12 overflow-hidden rounded-2xl border border-white/5 p-8 shadow-2xl">
					<div className="bg-primary-500/10 absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl" />

					<div className="pc:flex-row pc:items-center relative flex flex-col items-start gap-8">
						<div className="bg-discord-bg flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/10 shadow-2xl">
							<Image
								priority
								src={'/icons/home_cat.svg'}
								alt={'Logo'}
								width={56}
								height={56}
								className="opacity-80 brightness-0 invert"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-primary-400 text-xs font-black tracking-[0.3em] uppercase">Discovery</span>
							<h2 className="tb:text-4xl text-3xl font-black tracking-tighter text-white">
								최고의 크루와 함께{' '}
								<span className="text-primary-500 decoration-primary-500/30 underline underline-offset-8">
									새로운 전장으로
								</span>
							</h2>
							<p className="text-discord-muted mt-2 max-w-2xl text-base leading-relaxed font-medium">
								혼자 고민하지 마세요. 지금 바로 합류할 크루를 찾아보세요.
							</p>
						</div>
					</div>
				</section>

				<div className="flex flex-col gap-10">
					{/* 필터 및 카테고리 영역 */}
					<div className="flex flex-col gap-8">
						<GatheringFilterBar setFilterCriteria={setFilterCriteria} />
					</div>

					{/* 리스트 영역 */}
					<div className="flex flex-col gap-6">
						{hasData && (
							<>
								<CardList gatherings={data as Gathering[]} />
								<div className="h-20" ref={ref} />
							</>
						)}
						{isLoading && (
							<div className="tb:grid-cols-2 pc:grid-cols-3 grid grid-cols-1 gap-6">
								{SKELETON_ITEMS.map(i => (
									<CardSkeleton key={i} />
								))}
							</div>
						)}
						{isEmpty && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className="bg-discord-surface flex min-h-[400px] flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-12 text-center">
								<div className="bg-discord-bg mb-6 flex h-20 w-20 items-center justify-center rounded-full opacity-20">
									<Image src="/images/no_data.svg" alt="No Data" width={48} height={48} className="grayscale" />
								</div>
								<p className="text-discord-text text-xl font-bold">합류할 수 있는 크루가 없네요</p>
								<p className="text-discord-muted mt-2 text-base">
									필터를 조정하거나, 직접 새로운 전장을 만들어보는 건 어떨까요?
								</p>
							</motion.div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

'use client';

import { useEffect, useState } from 'react';
import JoinedGatherings from './JoinedGatherings';
import MyReviews from './MyReviews';
import CreatedGathering from './CreatedGathering';
import Tab from '@/components/commons/Tab';
import { TABS } from '@/constants/options';

type TabKey = 'JoinedGathering' | 'MyReview' | 'CreatedGathering';

export default function MyActivityContainer() {
	/** 현재 활성화된 탭 */
	const [activeTab, setActiveTab] = useState<TabKey>('JoinedGathering');
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) return null;

	return (
		<section className="mb:px-6 flex flex-1 flex-col px-4 py-6">
			{/* 나의 모임, 나의 리뷰, 내가 만든 모임 탭 메뉴 */}
			<Tab
				options={TABS}
				selectedTab={activeTab}
				onTabChange={tabId => setActiveTab(tabId as TabKey)}
				className="mb-6"
			/>

			{/* 각 탭 클릭 시 알맞는 컨텐츠 호출 */}
			{activeTab === 'JoinedGathering' && <JoinedGatherings />}
			{activeTab === 'MyReview' && <MyReviews />}
			{activeTab === 'CreatedGathering' && <CreatedGathering />}
		</section>
	);
}

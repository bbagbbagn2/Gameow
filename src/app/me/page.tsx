'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';

import CreatedGathering from '@/components/me/MyActivityContainer/CreatedGathering';
import JoinedGatherings from '@/components/me/MyActivityContainer/JoinedGatherings';
import MyReviews from '@/components/me/MyActivityContainer/MyReviews';
import MyPageSidebar, { type MeTab } from '@/components/me/MyPageSidebar';
import ProfileEditCard from '@/components/me/ProfileEditContainer';

export default function Me() {
	const [activeTab, setActiveTab] = useState<MeTab>('profile');

	const renderContent = () => {
		switch (activeTab) {
			case 'profile':
				return <ProfileEditCard />;
			case 'joined':
				return <JoinedGatherings />;
			case 'reviews':
				return <MyReviews />;
			case 'created':
				return <CreatedGathering />;
			default:
				return <ProfileEditCard />;
		}
	};

	const getTitle = () => {
		switch (activeTab) {
			case 'profile':
				return 'My Account';
			case 'joined':
				return 'My Gatherings';
			case 'reviews':
				return 'My Reviews';
			case 'created':
				return 'Created by Me';
			default:
				return 'My Page';
		}
	};

	return (
		<div className="bg-discord-bg min-h-screen">
			<div className="pc:max-w-320 pc:mx-auto pc:flex-row pc:min-h-screen m-auto flex flex-col">
				{/* 사이드바 */}
				<div className="pc:w-64 pc:border-r bg-discord-bg pc:pt-12 w-full border-white/5">
					<MyPageSidebar activeTab={activeTab} onTabChange={setActiveTab} />
				</div>

				{/* 메인 콘텐츠 영역 */}
				<main className="bg-discord-surface pc:px-12 pc:py-12 flex-1 overflow-y-auto px-4 py-8">
					<div className="mx-auto max-w-4xl">
						<header className="mb-10">
							<h1 className="text-3xl font-black tracking-tighter text-white uppercase">{getTitle()}</h1>
							<p className="text-discord-muted mt-2 text-sm font-medium">
								{activeTab === 'profile'
									? '계정 설정 및 프로필을 관리하세요.'
									: '나의 활동 내역을 확인하고 관리하세요.'}
							</p>
						</header>

						<AnimatePresence mode="wait">
							<motion.div
								key={activeTab}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}>
								{renderContent()}
							</motion.div>
						</AnimatePresence>
					</div>
				</main>
			</div>
		</div>
	);
}

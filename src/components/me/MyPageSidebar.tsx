'use client';

import { cn } from '@/utils/cn';

export type MeTab = 'profile' | 'joined' | 'reviews' | 'created';

interface MyPageSidebarProps {
	activeTab: MeTab;
	onTabChange: (tab: MeTab) => void;
}

interface SidebarItemProps {
	id: MeTab;
	activeTab: MeTab;
	label: string;
	icon?: string;
	onClick: (id: MeTab) => void;
}

function SidebarItem({ id, activeTab, label, icon, onClick }: SidebarItemProps) {
	const isActive = activeTab === id;

	return (
		<button
			onClick={() => onClick(id)}
			className={cn(
				'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
				isActive
					? 'bg-discord-hover text-white shadow-sm'
					: 'text-discord-muted hover:bg-discord-hover/50 hover:text-discord-text'
			)}>
			{icon && (
				<span
					className={cn('h-4 w-4 transition-colors', isActive ? 'bg-primary-500' : 'bg-discord-muted')}
					style={{
						WebkitMaskImage: `url(${icon})`,
						maskImage: `url(${icon})`,
						WebkitMaskRepeat: 'no-repeat',
						maskRepeat: 'no-repeat',
						WebkitMaskPosition: 'center',
						maskPosition: 'center',
						WebkitMaskSize: 'contain',
						maskSize: 'contain'
					}}
				/>
			)}
			{label}
		</button>
	);
}

export default function MyPageSidebar({ activeTab, onTabChange }: MyPageSidebarProps) {
	return (
		<aside className="bg-discord-bg pc:h-full pc:w-64 pc:p-8 flex w-full shrink-0 flex-col">
			{/* 모바일 탭 */}
			<div className="pc:hidden no-scrollbar flex w-full overflow-x-auto p-1">
				<div className="flex min-w-max gap-1">
					<SidebarItem id="profile" activeTab={activeTab} label="Account" onClick={onTabChange} />
					<SidebarItem id="joined" activeTab={activeTab} label="Gatherings" onClick={onTabChange} />
					<SidebarItem id="reviews" activeTab={activeTab} label="Reviews" onClick={onTabChange} />
					<SidebarItem id="created" activeTab={activeTab} label="Created" onClick={onTabChange} />
				</div>
			</div>

			{/* 데스크탑 사이드바 */}
			<div className="pc:flex pc:flex-col pc:gap-8 hidden">
				<div>
					<h3 className="text-discord-muted mb-3 px-3 text-[11px] font-black tracking-widest uppercase">
						User Settings
					</h3>
					<div className="flex flex-col gap-0.5">
						<SidebarItem
							id="profile"
							activeTab={activeTab}
							label="My Account"
							icon="/icons/person.svg"
							onClick={onTabChange}
						/>
					</div>
				</div>

				<div>
					<h3 className="text-discord-muted mb-3 px-3 text-[11px] font-black tracking-widest uppercase">My Activity</h3>
					<div className="flex flex-col gap-0.5">
						<SidebarItem
							id="joined"
							activeTab={activeTab}
							label="My Gatherings"
							icon="/icons/heart_to_heart.svg"
							onClick={onTabChange}
						/>
						<SidebarItem
							id="reviews"
							activeTab={activeTab}
							label="My Reviews"
							icon="/icons/edit.svg"
							onClick={onTabChange}
						/>
						<SidebarItem
							id="created"
							activeTab={activeTab}
							label="Created by Me"
							icon="/icons/plus_gathering.svg"
							onClick={onTabChange}
						/>
					</div>
				</div>
			</div>
		</aside>
	);
}

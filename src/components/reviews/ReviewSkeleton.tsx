import React from 'react';

export default function ReviewSkeleton() {
	return (
		<div className="bg-discord-surface flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/5 p-6 shadow-xl tb:flex-row">
			{/* 모임 이미지 스켈레톤 */}
			<div className="bg-discord-bg h-48 w-full animate-pulse rounded-xl tb:w-64" />

			{/* 리뷰 정보 스켈레톤 */}
			<div className="flex flex-1 flex-col justify-between py-1">
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						{/* 별점 스켈레톤 */}
						<div className="flex gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="bg-discord-bg h-4 w-4 animate-pulse rounded-full opacity-20" />
							))}
						</div>
						<div className="bg-discord-bg h-3 w-20 animate-pulse rounded-full opacity-20" />
					</div>

					<div className="flex flex-col gap-3">
						<div className="bg-discord-bg h-4 w-1/3 animate-pulse rounded-full opacity-40" />
						<div className="flex flex-col gap-2">
							<div className="bg-discord-bg h-3 w-full animate-pulse rounded-full opacity-20" />
							<div className="bg-discord-bg h-3 w-5/6 animate-pulse rounded-full opacity-20" />
						</div>
					</div>
				</div>

				{/* 유저 정보 스켈레톤 */}
				<div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
					<div className="bg-discord-bg h-8 w-8 animate-pulse rounded-full opacity-20" />
					<div className="flex flex-col gap-1.5">
						<div className="bg-discord-bg h-3 w-16 animate-pulse rounded-full opacity-40" />
						<div className="bg-discord-bg h-2 w-20 animate-pulse rounded-full opacity-20" />
					</div>
				</div>
			</div>
		</div>
	);
}

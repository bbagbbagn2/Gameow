import React from 'react';

export default function ReviewSkeleton() {
	return (
		<div className="bg-discord-card flex h-full flex-col overflow-hidden rounded-xl border border-white/5 animate-pulse">
			{/* 상단 이미지 영역 스켈레톤 */}
			<div className="bg-discord-bg relative h-48 w-full shrink-0 opacity-40">
				<div className="absolute bottom-3 left-3 h-5 w-16 rounded bg-discord-surface opacity-60" />
				<div className="absolute top-3 right-3 h-5 w-20 rounded bg-discord-surface opacity-40" />
			</div>

			{/* 하단 정보 영역 스켈레톤 */}
			<div className="flex flex-1 flex-col p-5">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						{/* 별점 스켈레톤 */}
						<div className="flex gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="bg-discord-bg h-4 w-4 rounded-full opacity-20" />
							))}
						</div>
						{/* 모임 이름 스켈레톤 */}
						<div className="bg-discord-bg h-3 w-1/2 rounded opacity-40" />
					</div>

					{/* 리뷰 텍스트 스켈레톤 */}
					<div className="flex flex-col gap-2">
						<div className="bg-discord-bg h-4 w-full rounded opacity-20" />
						<div className="bg-discord-bg h-4 w-5/6 rounded opacity-20" />
						<div className="bg-discord-bg h-4 w-4/6 rounded opacity-20" />
					</div>

					{/* 유저 정보 스켈레톤 */}
					<div className="mt-2 flex items-center gap-2.5 border-t border-white/5 pt-4">
						<div className="bg-discord-bg h-8 w-8 rounded-full border border-white/10 opacity-20" />
						<div className="flex flex-col gap-2">
							<div className="bg-discord-bg h-3 w-16 rounded opacity-40" />
							<div className="bg-discord-bg h-2 w-20 rounded opacity-20" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

import React from 'react';

export default function ScoreSkeleton() {
	return (
		<div className="flex flex-col gap-10 tb:flex-row tb:items-center tb:justify-between animate-pulse">
			{/* 평균 점수 영역 스켈레톤 */}
			<div className="flex flex-col items-center gap-4 tb:items-start tb:pl-4">
				<div className="flex flex-col items-center tb:items-start">
					<div className="bg-discord-bg h-3 w-24 rounded opacity-20" />
					<div className="mt-2 flex items-baseline gap-2">
						<div className="bg-discord-bg h-12 w-20 rounded-lg opacity-40" />
						<div className="bg-discord-bg h-6 w-12 rounded opacity-20" />
					</div>
				</div>

				<div className="flex gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="bg-discord-bg h-6 w-6 rounded-full opacity-20" />
					))}
				</div>
				<div className="bg-discord-bg h-3 w-32 rounded opacity-20" />
			</div>

			{/* 점수 분포 영역 스켈레톤 */}
			<div className="flex flex-1 flex-col gap-3 pc:max-w-md w-full">
				{Array.from({ length: 5 }).map((_, i) => (
					<div key={i} className="flex items-center gap-4">
						<div className="bg-discord-bg h-3 w-8 rounded opacity-20" />
						<div className="bg-discord-bg h-2 flex-1 rounded-full opacity-10" />
						<div className="bg-discord-bg h-3 w-10 rounded opacity-20" />
					</div>
				))}
			</div>
		</div>
	);
}

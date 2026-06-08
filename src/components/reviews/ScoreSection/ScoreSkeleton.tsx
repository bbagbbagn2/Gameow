import React from 'react';

export default function ScoreSkeleton() {
	return (
		<div className="tb:flex-row tb:items-center tb:justify-between flex animate-pulse flex-col gap-10">
			{/* 평균 점수 영역 스켈레톤 */}
			<div className="tb:items-start tb:pl-4 flex flex-col items-center gap-4">
				<div className="tb:items-start flex flex-col items-center">
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
			<div className="pc:max-w-md flex w-full flex-1 flex-col gap-3">
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

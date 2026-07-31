'use client';

export default function CardSkeleton() {
	return (
		<div className="bg-discord-card relative flex animate-pulse flex-col overflow-hidden rounded-xl border border-white/5 shadow-xl">
			{/* 상단 이미지 영역 */}
			<div className="bg-discord-surface h-48 w-full shrink-0" />

			{/* 하단 정보 영역 */}
			<div className="flex flex-1 flex-col p-5">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-2">
						{/* 제목 */}
						<div className="bg-discord-surface h-6 w-3/4 rounded" />
						{/* 태그 */}
						<div className="flex items-center gap-2">
							<div className="bg-discord-surface h-4 w-20 rounded" />
							<div className="bg-discord-surface h-4 w-24 rounded" />
						</div>
					</div>

					{/* 인원 정보 */}
					<div className="bg-discord-surface h-7 w-24 rounded-full" />
				</div>

				{/* 버튼 영역 */}
				<div className="mt-8 flex items-center gap-2">
					<div className="bg-discord-surface h-10 flex-1 rounded-md" />
					<div className="bg-discord-surface h-10 flex-1 rounded-md" />
				</div>
			</div>
		</div>
	);
}

export default function GatheringSkeleton() {
	return (
		<div className="flex flex-col gap-6">
			{Array.from({ length: 3 }).map((_, index) => (
				<div
					key={index}
					className="bg-discord-card relative flex animate-pulse flex-col gap-4 overflow-hidden rounded-xl border border-white/5 p-4 shadow-xl">
					<div className="tb:flex-row flex flex-col gap-5">
						<div className="tb:w-60 bg-discord-surface relative h-36 w-full shrink-0 overflow-hidden rounded-lg" />
						<div className="flex flex-1 flex-col justify-between py-1">
							<div className="flex flex-col gap-3">
								<div className="flex flex-col gap-2">
									<div className="bg-discord-surface h-6 w-48 rounded" />
									<div className="flex items-center gap-2">
										<div className="bg-discord-surface h-4 w-20 rounded" />
										<div className="bg-discord-surface h-4 w-32 rounded" />
									</div>
								</div>
								<div className="bg-discord-surface h-7 w-24 rounded-full" />
							</div>
							<div className="bg-discord-surface mt-6 h-10 w-28 rounded-md" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

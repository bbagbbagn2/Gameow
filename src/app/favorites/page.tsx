import FavoriteGatherings from '@/components/favorites/FavoriteGatherings';

export default function Page() {
	return (
		<div className="bg-discord-bg min-h-screen">
			<div className="m-auto flex min-h-screen w-full flex-col">
				<FavoriteGatherings />
			</div>
		</div>
	);
}


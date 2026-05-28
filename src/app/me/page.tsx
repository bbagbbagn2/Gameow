import ProfileEditCard from '@/components/me/ProfileEditContainer';
import MyActivityContainer from '@/components/me/MyActivityContainer';

export default function Me() {
	return (
		<div className="bg-discord-bg min-h-screen">
			<div className="tb:px-6 tb:pt-10 pc:max-w-300 pc:px-25 m-auto flex flex-col px-4 pt-8">
				<header className="mb-8">
					<h1 className="text-2xl font-black tracking-tight text-white uppercase">My Page</h1>
					<p className="text-discord-muted mt-1 text-sm font-medium">계정 설정 및 활동 내역을 관리하세요.</p>
				</header>
				<ProfileEditCard />
				<MyActivityContainer />
			</div>
		</div>
	);
}


import { ReactNode } from 'react';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="bg-discord-bg flex min-h-screen w-full items-center justify-center p-4">
			<section className="bg-discord-surface flex w-full max-w-[480px] flex-col overflow-hidden rounded-lg border border-white/5 p-8 shadow-2xl">
				<div className="flex flex-col items-center gap-2 text-center">
					<div className="relative mb-2 h-12 w-48">
						<Image priority src="/images/text_logo.svg" alt="GAMEOW" fill className="object-contain brightness-0 invert" />
					</div>
					<h2 className="text-2xl font-black tracking-tight text-white uppercase">Welcome back!</h2>
					<p className="text-discord-muted mb-8 text-sm font-medium">게임도 친구도, GAMEOW에서 함께 즐겨요 🎮</p>
				</div>
				{children}
			</section>
		</div>
	);
}


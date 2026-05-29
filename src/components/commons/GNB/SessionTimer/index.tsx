'use client';

import Image from 'next/image';

import { useTimer } from '@/hooks/useTimer';
import { useTokenStore } from '@/stores/token';

export default function SessionTimer() {
	const exp = useTokenStore(state => state.exp);
	const { formattedTime } = useTimer(exp);

	if (!formattedTime) return null;

	return (
		<div className="bg-discord-card/50 hover:bg-discord-hover flex items-center gap-2 rounded-full border border-white/5 px-3 py-1.5 transition-colors">
			<Image
				priority
				src="/icons/clock.svg"
				alt="시계"
				width={16}
				height={16}
				className="opacity-60 brightness-0 invert"
			/>
			<span className="text-primary-400 text-xs font-black tracking-widest uppercase tabular-nums">
				{formattedTime}
			</span>
		</div>
	);
}

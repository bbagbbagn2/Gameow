'use client';

import { useEffect, useRef } from 'react';

import { AnimatePresence } from 'framer-motion';
import * as motion from 'motion/react-client';

import { Step } from '@/stores/useFunnelStore';

const STEP_LABELS: Record<Step, string> = {
	1: '기본 정보',
	2: '카테고리와 이미지',
	3: '일정 선택',
	4: '모집 정원'
};

function StepIndicator({ step }: { step: Step }) {
	const prevStepRef = useRef(step);

	useEffect(() => {
		prevStepRef.current = step;
	}, [step]);

	return (
		<div className="text-primary-500 items-cetnter bg-primary-500/10 relative flex h-7 w-fit items-center justify-center gap-1 overflow-hidden rounded-full px-3 text-sm font-bold">
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={step}
					initial={{ y: step > prevStepRef.current ? 20 : -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: step > prevStepRef.current ? -20 : 20, opacity: 0 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}>
					{step}
				</motion.span>
			</AnimatePresence>

			<span>/</span>
			<span>4</span>
		</div>
	);
}

export default function CreateGatheringHeader({ step }: { step: Step }) {
	return (
		<header className="border-b border-white/5 px-6 pt-6 pb-5">
			<div className="mb-5 flex items-start justify-between gap-5 pr-10">
				<div className="flex flex-col gap-1">
					<h2 className="text-primary-500 text-xl font-bold [text-shadow:0_0_1px_#5ff7e6,0_0_0px_#5ff7e6,0_0_0px_#5ff7e6,0_0_2px_#5ff7e6]">
						크루 생성
					</h2>
					<p className="text-discord-muted text-sm font-semibold">{STEP_LABELS[step]}</p>
				</div>

				<StepIndicator step={step} />
			</div>

			<div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
				<div
					className="from-primary-300 via-primary-300 to-highlight absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r transition-all duration-500"
					style={{ width: `${(step / 4) * 100}%` }}
				/>
			</div>
		</header>
	);
}

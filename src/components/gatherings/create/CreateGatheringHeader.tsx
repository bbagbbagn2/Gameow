'use client';

import { useEffect, useRef } from 'react';

import { AnimatePresence } from 'framer-motion';
import * as motion from 'motion/react-client';

import { Step } from '@/stores/useFunnelStore';

function StepIndicator({ step }: { step: Step }) {
	const prevStepRef = useRef(step);

	useEffect(() => {
		prevStepRef.current = step;
	}, [step]);

	return (
		<div className="text-primary-500 relative flex h-6 w-fit items-center justify-center overflow-hidden text-sm">
			<div className="relative h-6 w-4 overflow-hidden">
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={step}
						initial={{ y: step > prevStepRef.current ? 20 : -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: step > prevStepRef.current ? -20 : 20, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute right-0 left-0 text-center">
						{step}
					</motion.span>
				</AnimatePresence>
			</div>
			<div className="flex gap-1 pb-[4.5px]">
				<span>/</span>
				<span>4</span>
			</div>
		</div>
	);
}

export default function CreateGatheringHeader({ step }: { step: Step }) {
	return (
		<div className="flex gap-3">
			<h2 className="text-primary-500 text-xl font-bold [text-shadow:0_0_1px_#5ff7e6,0_0_0px_#5ff7e6,0_0_0px_#5ff7e6,0_0_2px_#5ff7e6]">
				크루 생성
			</h2>

			<div className="flex flex-1 flex-col">
				<StepIndicator step={step} />

				<div className="relative h-2 w-full rounded-full bg-gray-200">
					<div
						className="from-primary-300 via-primary-300 to-highlight absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r transition-all duration-500"
						style={{ width: `${(step / 4) * 100}%` }}
					/>
				</div>
			</div>
		</div>
	);
}

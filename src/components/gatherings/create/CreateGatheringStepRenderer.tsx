'use client';

import Step1Funnel from '@/components/gatherings/funnel/Step1Funnel';
import Step2Funnel from '@/components/gatherings/funnel/Step2Funnel';
import Step3Funnel from '@/components/gatherings/funnel/Step3Funnel';
import Step4Funnel from '@/components/gatherings/funnel/Step4Funnel';
import SliderAnimationDiv from '@/components/gatherings/sliderAnimation/SliderAnimationDiv';
import { Step } from '@/stores/useFunnelStore';

export default function CreateGatheringStepRenderer({ step }: { step: Step }) {
	return (
		<SliderAnimationDiv className="max-mb:h-auto mx-auto flex h-[450px] w-full flex-col justify-between rounded-3xl">
			{step === 1 && <Step1Funnel />}
			{step === 2 && <Step2Funnel />}
			{step === 3 && <Step3Funnel />}
			{step === 4 && <Step4Funnel />}
		</SliderAnimationDiv>
	);
}

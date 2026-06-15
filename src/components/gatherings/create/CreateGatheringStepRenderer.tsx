'use client';

import BasicInfoStep from '@/components/gatherings/create/steps/BasicInfoStep';
import CapacityStep from '@/components/gatherings/create/steps/CapacityStep';
import CategoryImageStep from '@/components/gatherings/create/steps/CategoryImageStep';
import ScheduleStep from '@/components/gatherings/create/steps/ScheduleStep';
import SliderAnimationDiv from '@/components/gatherings/sliderAnimation/SliderAnimationDiv';
import { Step } from '@/stores/useFunnelStore';

export default function CreateGatheringStepRenderer({ step }: { step: Step }) {
	return (
		<SliderAnimationDiv className="max-mb:h-auto mx-auto flex h-[450px] w-full flex-col justify-between rounded-3xl">
			{step === 1 && <BasicInfoStep />}
			{step === 2 && <CategoryImageStep />}
			{step === 3 && <ScheduleStep />}
			{step === 4 && <CapacityStep />}
		</SliderAnimationDiv>
	);
}

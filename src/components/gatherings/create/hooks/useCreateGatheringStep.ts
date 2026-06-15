'use client';

import { useFormContext } from 'react-hook-form';

import { useFunnelStore } from '@/stores/useFunnelStore';
import { GatheringSchemaType, Step3Schema, Step3SchemaType } from '@/utils/schema';

export default function useCreateGatheringStep() {
	const { step, next, prev } = useFunnelStore();
	const { trigger, getValues, setError } = useFormContext<GatheringSchemaType>();

	const validateScheduleStep = () => {
		const result = Step3Schema.safeParse(getValues());

		if (result.success) return true;

		result.error.issues.forEach(issue => {
			setError(issue.path[0] as keyof Step3SchemaType, {
				type: 'manual',
				message: issue.message
			});
		});

		return false;
	};

	const handleNext = async () => {
		if (step === 1) {
			const isStepValid = await trigger(['name', 'location']);
			if (isStepValid) next();
			return;
		}

		if (step === 2) {
			const isStepValid = await trigger(['type', 'image']);
			if (isStepValid) next();
			return;
		}

		if (step === 3 && validateScheduleStep()) {
			next();
		}
	};

	return {
		handleNext,
		handlePrev: prev
	};
}

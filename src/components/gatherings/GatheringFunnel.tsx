'use client';

import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import BasicModal from '@/components/commons/basic/BasicModal';
import BasicPopup from '@/components/commons/basic/BasicPopup';
import CreateGatheringFooter from '@/components/gatherings/create/CreateGatheringFooter';
import CreateGatheringHeader from '@/components/gatherings/create/CreateGatheringHeader';
import CreateGatheringStepRenderer from '@/components/gatherings/create/CreateGatheringStepRenderer';
import useCreateGatheringStep from '@/components/gatherings/create/hooks/useCreateGatheringStep';
import useCreateGatheringSubmit from '@/components/gatherings/create/hooks/useCreateGatheringSubmit';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModal, useModalClose } from '@/hooks/useModal';
import { useFunnelStore } from '@/stores/useFunnelStore';
import { CreateGathering } from '@/types/response/createGathering';
import { CreateGatheringSchema, GatheringSchemaType } from '@/utils/schema';

export default function GatheringFunnel() {
	const { reset } = useFunnelStore();
	const methods = useForm<GatheringSchemaType>({
		resolver: zodResolver(CreateGatheringSchema),
		mode: 'onChange'
	});
	const { openModal } = useModal();
	const closePopup = useModalClose();

	const handleCloseWithPopup = () => {
		const { title, subTitle } = POPUP_MESSAGE.CREATE;

		openModal(
			<BasicPopup
				title={title}
				subTitle={subTitle}
				onConfirm={() => {
					closePopup();
					reset();
				}}
				cancelText="취소"
			/>,
			'create-gathering-popup'
		);
	};

	return (
		<BasicModal onClose={handleCloseWithPopup} width="600px" className="">
			<FormProvider {...methods}>
				<CreateGatheringForm />
			</FormProvider>
		</BasicModal>
	);
}

function CreateGatheringForm() {
	const { step } = useFunnelStore();
	const { handleSubmit } = useFormContext<GatheringSchemaType>();
	const { handleNext, handlePrev } = useCreateGatheringStep();
	const { submitGathering, isPending } = useCreateGatheringSubmit();

	return (
		<form onSubmit={handleSubmit(data => submitGathering(data as CreateGathering))}>
			<CreateGatheringHeader step={step} />
			<CreateGatheringStepRenderer step={step} />
			<CreateGatheringFooter step={step} isPending={isPending} onNext={handleNext} onPrev={handlePrev} />
		</form>
	);
}

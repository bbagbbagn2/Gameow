'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postGathering } from '@/apis/gatherings';
import BasicPopup from '@/components/commons/basic/BasicPopup';
import { useModal, useModalClose } from '@/hooks/useModal';
import { useFunnelStore } from '@/stores/useFunnelStore';
import { CreateGathering } from '@/types/response/createGathering';
import { GatheringType } from '@/types/response/gatherings';
import { queryKeys } from '@/utils/query-keys';

export default function useCreateGatheringSubmit() {
	const closeModal = useModalClose();
	const queryClient = useQueryClient();
	const router = useRouter();
	const { reset } = useFunnelStore();
	const { openModal } = useModal();

	const { mutate, isPending } = useMutation({
		mutationFn: postGathering,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.lists() });
			openModal(<BasicPopup title="모임이 생성되었습니다." />, 'create-gathering-popup');
			closeModal();
			reset();
			router.push('/');
		}
	});

	const submitGathering = (data: CreateGathering) => {
		const formData = new FormData();

		formData.append('location', data.location);
		formData.append('type', data.type as GatheringType);
		formData.append('name', data.name);
		formData.append('dateTime', data.dateTime);
		formData.append('registrationEnd', data.registrationEnd);
		formData.append('capacity', String(data.capacity));
		if (data.image instanceof File) formData.append('image', data.image);

		mutate(formData);
	};

	return {
		isPending,
		submitGathering
	};
}

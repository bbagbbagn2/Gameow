import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { getDirtyProfileUpdates, hasDirtyProfileFields } from '@/components/me/ProfileEditContainer/utils/profileEditForm';
import { useModalClose } from '@/hooks/useModal';
import { profileEditSchema, type ProfileEditSchemaType } from '@/utils/schema';

interface UseProfileEditModalParams {
	currentNickname?: string;
	onSubmit: (data: Partial<ProfileEditSchemaType>) => Promise<void>;
}

export function useProfileEditModal({ currentNickname, onSubmit }: UseProfileEditModalParams) {
	const closeModal = useModalClose();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty, isSubmitting, dirtyFields },
		setValue,
		setError
	} = useForm<ProfileEditSchemaType>({
		mode: 'onChange',
		resolver: zodResolver(profileEditSchema),
		defaultValues: { companyName: currentNickname ?? '', image: undefined }
	});

	const handleProfileImage = useCallback(
		(selectedFile: File) => {
			setValue('image', selectedFile, { shouldValidate: true, shouldDirty: true });
		},
		[setValue]
	);

	const handleFormSubmit = useCallback(
		async (data: ProfileEditSchemaType) => {
			if (!hasDirtyProfileFields(dirtyFields)) {
				closeModal();
				return;
			}

			const updates = getDirtyProfileUpdates(data, dirtyFields);

			try {
				await onSubmit(updates);
				closeModal();
			} catch (error) {
				setError('root', {
					message: error instanceof Error ? error.message : '프로필 수정에 실패했습니다.'
				});
			}
		},
		[closeModal, dirtyFields, onSubmit, setError]
	);

	return {
		register,
		errors,
		isValid,
		isDirty,
		isSubmitting,
		closeModal,
		handleSubmit,
		handleProfileImage,
		handleFormSubmit
	};
}

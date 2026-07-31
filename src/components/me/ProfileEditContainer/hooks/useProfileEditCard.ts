import { createElement, useCallback, useEffect, useMemo } from 'react';

import { getUserInfo, updateUserInfo } from '@/apis/auths/user';
import ProfileEditModal from '@/components/me/ProfileEditContainer/components/ProfileEditModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useModal } from '@/hooks/useModal';
import { useSignout } from '@/hooks/useSignout';
import { useUserStore } from '@/stores/user';
import type { ProfileEditSchemaType } from '@/utils/schema';

export function useProfileEditCard() {
	const { openModal } = useModal();
	const { handleError } = useErrorHandler();
	const { user, updateUser, hasHydrated } = useUserStore();
	const { handleSignout } = useSignout();

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const data = await getUserInfo();
				updateUser({ email: data.email, name: data.name, image: data.image, companyName: data.companyName });
			} catch (err) {
				handleError(err);
			}
		};

		if (hasHydrated && !user) fetchUserInfo();
	}, [user, updateUser, handleError, hasHydrated]);

	const handleUpdateUserInfo = useCallback(
		async (updated: Partial<ProfileEditSchemaType>) => {
			try {
				const updatedUser = await updateUserInfo(updated);
				updateUser({ companyName: updatedUser.companyName, image: updatedUser.image });
			} catch (err) {
				handleError(err);
			}
		},
		[handleError, updateUser]
	);

	const handleOpenEditModal = useCallback(() => {
		openModal(
			createElement(ProfileEditModal, {
				currentNickname: user?.companyName,
				currentImage: user?.image,
				onSubmit: handleUpdateUserInfo
			})
		);
	}, [openModal, user?.companyName, user?.image, handleUpdateUserInfo]);

	const accountInfoList = useMemo(
		() => [
			{ label: 'Email Address', value: user?.email || 'Not verified' },
			{ label: 'Active Name', value: user?.name || 'Not set' }
		],
		[user?.email, user?.name]
	);

	return { user, hasHydrated, accountInfoList, handleOpenEditModal, handleSignout };
}

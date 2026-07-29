import { createElement, useCallback, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { getUserInfo, updateUserInfo } from '@/apis/auths/user';
import RequiredLoginPopup from '@/components/auth/Popup/RequiredLoginPopup';
import BasicPopup from '@/components/commons/basic/BasicPopup';
import { useModal } from '@/hooks/useModal';
import { useUserStore } from '@/stores/user';

const PROFILE_UPDATE_FAILED_POPUP = {
	title: '프로필 수정 실패',
	subTitle: '프로필 정보를 수정하지 못했습니다. 잠시 후 다시 시도해주세요.',
	confirmText: '확인'
};

export function useProfileEditCard() {
	const { user, updateUser } = useUserStore();
	const { openModal } = useModal();
	const pathname = usePathname();

	const USER_INFO_LIST = [
		{ label: 'company.', value: user?.companyName },
		{ label: 'E-mail.', value: user?.email },
	];

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const data = await getUserInfo();
				updateUser({ email: data.email, name: data.name, image: data.image, companyName: data.companyName });
			} catch (err) {
				openModal(createElement(RequiredLoginPopup, { next: pathname }), 'required-login-popup');
			}
		};

		if (!user) fetchUserInfo();
	}, [openModal, pathname, user, updateUser]);

	const handleUpdateUserInfo = useCallback(async (updated: { companyName?: string; image?: File | null }) => {
		try {
			const updatedUser = await updateUserInfo(updated);
			updateUser({ companyName: updatedUser.companyName, image: updatedUser.image });
		} catch (err) {
			openModal(createElement(BasicPopup, PROFILE_UPDATE_FAILED_POPUP),'profile-update-failed-popup');
		}
	}, [openModal, updateUser]);

	const userInfoList = useMemo(() => USER_INFO_LIST, [user?.companyName, user?.email]);

	return { user, userInfoList, handleUpdateUserInfo };
}

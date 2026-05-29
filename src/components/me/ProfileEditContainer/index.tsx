'use client';

import Image from 'next/image';
import * as motion from 'motion/react-client';
import { useCallback, useEffect } from 'react';
import { getUserInfo, updateUserInfo } from '@/apis/auths/user';
import { PROFILE_PATHS } from '@/constants/assetPath';
import { useUserStore } from '@/stores/user';
import { useModal } from '@/hooks/useModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import ProfileEditModal from './ProfileEditModal/ProfileEditModal';

/**
 * @typedef {Object} ProfileUpdateData
 * @property {string} [companyName] - 업데이트할 회사명 (선택 사항).
 * @property {File | null} [image] - 업데이트할 프로필 이미지 파일 또는 null (선택 사항).
 */

/**
 * `ProfileEditCard` 컴포넌트
 *
 * 사용자의 프로필 정보를 표시하고, 프로필 사진 및 회사명을 수정할 수 있는 UI를 제공합니다.
 * - 프로필 카드 배경 이미지, 사진, 회사명, 이름, 이메일 표시
 * - 화면 크기(screenSize)에 따라 다른 배경 이미지 및 버튼 이미지를 적용
 * - 회사명 수정 버튼 클릭 시 Modal을 표시
 *
 * @component
 * @returns {JSX.Element} 프로필 카드 UI 및 Modal을 렌더링합니다.
 */
export default function ProfileEditCard() {
	const { DEFAULT_PROFILE_SRC, EDIT_ICON_SRC } = PROFILE_PATHS;
	const { openModal } = useModal();
	const { handleError } = useErrorHandler();
	const { user, updateUser, hasHydrated } = useUserStore();

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
		async (updated: { companyName?: string; image?: File | null }) => {
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
			<ProfileEditModal
				currentNickname={user?.companyName}
				currentImage={user?.image}
				onSubmit={handleUpdateUserInfo}
			/>
		);
	}, [openModal, user?.companyName, user?.image, handleUpdateUserInfo]);

	if (!hasHydrated) {
		return (
			<section className="mb-8">
				<div className="bg-discord-surface h-48 w-full animate-pulse rounded-2xl border border-white/5 shadow-2xl" />
			</section>
		);
	}

	return (
		<section className="mb-8">
			<div className="bg-discord-surface relative overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
				{/* 배너 영역 (민트 그라데이션) */}
				<div className="h-24 w-full bg-gradient-to-r from-primary-600 to-primary-400 opacity-80" />

				<div className="relative px-4 pb-4">
					{/* 프로필 이미지 (배너에 걸침) */}
					<div className="relative -mt-12 mb-3">
						<div className="bg-discord-surface h-24 w-24 rounded-full p-1.5 shadow-lg">
							<div className="relative h-full w-full overflow-hidden rounded-full">
								<Image
									src={user?.image || DEFAULT_PROFILE_SRC}
									alt="프로필 사진"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</div>

					{/* 유저 정보 및 수정 버튼 */}
					<div className="bg-discord-bg flex items-start justify-between rounded-xl p-4">
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-2">
								<h2 className="text-xl font-bold text-white">{user?.name}</h2>
								<span className="bg-primary-500/10 text-primary-500 rounded px-1.5 py-0.5 text-xs font-bold">
									GAMER
								</span>
							</div>
							<p className="text-discord-muted text-sm font-medium">{user?.email}</p>
							<div className="mt-2 flex items-center gap-2">
								<span className="text-discord-muted text-xs font-bold uppercase tracking-wider">Nickname</span>
								<p className="text-primary-400 text-sm font-semibold">{user?.companyName || '닉네임 없음'}</p>
							</div>
						</div>

						<motion.button
							type="button"
							onClick={handleOpenEditModal}
							className="bg-discord-card hover:bg-discord-hover group flex h-10 w-10 items-center justify-center rounded-full transition-all"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}>
							<Image
								src={EDIT_ICON_SRC}
								alt="수정"
								width={20}
								height={20}
								className="opacity-60 transition-opacity group-hover:opacity-100"
							/>
						</motion.button>
					</div>
				</div>
			</div>
		</section>
	);
}


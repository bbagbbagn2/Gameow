'use client';

import { useCallback, useEffect } from 'react';
import Image from 'next/image';

import { getUserInfo, updateUserInfo } from '@/apis/auths/user';
import { PROFILE_PATHS } from '@/constants/assetPath';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useModal } from '@/hooks/useModal';
import { useSignout } from '@/hooks/useSignout';
import { useUserStore } from '@/stores/user';

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
		<div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col gap-8 duration-500">
			{/* Profile Hero Section */}
			<div className="relative">
				{/* Modern Banner / Background */}
				<div className="pc:h-48 bg-discord-card relative h-32 w-full overflow-hidden rounded-2xl border border-white/5 shadow-inner">
					<div className="from-primary-900/30 to-highlight/10 absolute inset-0 bg-gradient-to-br via-transparent" />
					<div className="bg-primary-500/10 absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[100px]" />
					<div className="bg-highlight/5 absolute -bottom-12 -left-12 h-48 w-48 rounded-full blur-[80px]" />

					{/* Abstract Grid Pattern */}
					<div
						className="absolute inset-0 opacity-[0.03]"
						style={{
							backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
							backgroundSize: '20px 20px'
						}}
					/>
				</div>

				{/* Identity Overlay */}
				<div className="pc:px-10 pc:-mt-16 pc:flex-row pc:items-end pc:justify-between -mt-12 flex flex-col gap-6 px-6">
					<div className="pc:flex-row pc:items-end flex flex-col gap-6">
						{/* Large Avatar */}
						<div className="group relative">
							<div className="pc:w-40 pc:h-40 border-discord-surface bg-discord-bg relative h-28 w-28 overflow-hidden rounded-3xl border-[6px] shadow-2xl">
								<Image
									src={user?.image || DEFAULT_PROFILE_SRC}
									alt="프로필 사진"
									fill
									className="object-cover transition-transform duration-500"
								/>
							</div>
							<div className="bg-primary-500 text-discord-bg border-discord-surface absolute -right-2 -bottom-2 rounded-xl border-4 p-1.5 shadow-lg">
								<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
								</svg>
							</div>
						</div>

						{/* Identity Text */}
						<div className="pc:mb-2">
							<div className="flex items-center gap-3">
								<h2 className="pc:text-4xl text-3xl font-black tracking-tighter text-white uppercase">
									{user?.companyName}
								</h2>
							</div>
							<div className="text-discord-muted mt-1.5 flex items-center gap-3 text-sm font-medium">
								<span className="flex items-center gap-1.5">
									<div className="bg-primary-500 h-1.5 w-1.5 rounded-full" />
									Online
								</span>
							</div>
						</div>
					</div>

					{/* Quick Primary Action */}
					<div className="pc:mb-2">
						<button
							onClick={handleOpenEditModal}
							className="bg-primary-500 hover:bg-primary-400 text-discord-bg pc:w-auto w-full rounded-xl px-8 py-3 text-sm font-black tracking-tight uppercase shadow-[0_8px_20px_-4px_rgba(5,242,219,0.3)] transition-all active:scale-95">
							Edit Profile
						</button>
					</div>
				</div>
			</div>

			{/* Information Grid */}
			<div className="pc:grid-cols-3 grid grid-cols-1 gap-6">
				{/* Account Info Card */}
				<div className="pc:col-span-3 bg-discord-card pc:p-8 flex flex-col gap-8 rounded-2xl border border-white/5 p-6">
					<div>
						<h3 className="mb-6 text-xs font-black tracking-widest text-white uppercase opacity-40">Account Details</h3>
						<div className="flex flex-col gap-6">
							<div className="bg-discord-bg/40 flex flex-col gap-1 rounded-xl border border-white/[0.02] px-4 py-3">
								<span className="text-discord-muted text-[10px] font-black tracking-widest uppercase">
									Email Address
								</span>
								<p className="font-bold text-white">{user?.email || 'Not verified'}</p>
							</div>
							<div className="bg-discord-bg/40 flex flex-col gap-1 rounded-xl border border-white/[0.02] px-4 py-3">
								<span className="text-discord-muted text-[10px] font-black tracking-widest uppercase">Active Name</span>
								<p className="font-bold text-white">{user?.name || 'Not set'}</p>
							</div>
						</div>
					</div>

					{/* Danger Zone / Logout */}
					<div className="mt-4 border-t border-white/5 pt-8">
						<div className="bg-destructive/5 border-destructive/20 pc:flex-row pc:items-center flex flex-col justify-between gap-4 rounded-2xl border p-6">
							<div>
								<h4 className="text-destructive text-sm font-black tracking-tight uppercase">Danger Zone</h4>
								<p className="text-discord-muted mt-1 text-xs font-medium">
									로그아웃 시 현재 세션이 종료됩니다. 다시 로그인해야 합니다.
								</p>
							</div>
							<button
								onClick={handleSignout}
								className="bg-destructive hover:bg-destructive/80 shadow-destructive/20 rounded-xl px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg transition-all active:scale-95">
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

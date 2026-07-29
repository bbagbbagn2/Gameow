'use client';

import Image from 'next/image';

import { useProfileImageUploader } from './hooks/useProfileImageUploader';
import { DEFAULT_PROFILE_IMAGE_SRC, PROFILE_IMAGE_ACCEPT } from './utils/profileImage';

interface ProfileImageUploaderProps {
	/** 현재 프로필 이미지 URL (기존 이미지 미리보기용) */
	currentImage?: string;
	/** 이미지 변경 시 호출되는 콜백 — 선택된 파일과 미리보기 URL을 전달 */
	onChange: (file: File, preview: string) => void;
}

/**
 * 프로필 이미지를 업로드하고 미리보기를 제공하는 컴포넌트입니다.
 *
 * - 클릭 시 파일 선택 창이 열리며, 선택한 이미지를 즉시 미리보기로 표시합니다.
 * - 업로드된 파일(`File`)과 base64 미리보기 URL(`string`)을 함께 `onChange`로 반환합니다.
 * - 기본 이미지(`/images/profile.svg`)를 제공하며, 기존 프로필 이미지를 표시할 수 있습니다.
 *
 * @component
 * @example
 * ```tsx
 * <ProfileImageUploader
 *   currentImage="/images/user1.png"
 *   onChange={(file, preview) => console.log(file, preview)}
 * />
 * ```
 */
export default function ProfileImageUploader({ currentImage, onChange }: ProfileImageUploaderProps) {
	const { preview, fileInputRef, handleButtonClick, handleProfileImage } = useProfileImageUploader({
		currentImage,
		onChange,
	});

	return (
		<>
			<button type="button" className="relative cursor-pointer" onClick={handleButtonClick}>
				<Image
					src={preview || DEFAULT_PROFILE_IMAGE_SRC}
					alt="프로필 사진"
					width={56}
					height={56}
					className="h-14 w-14 rounded-full object-fill"
					unoptimized
				/>
				<div className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-white">
					<Image src="/icons/edit.svg" alt="프로필 변경 아이콘" width={18} height={18} />
				</div>
			</button>

			<input
				ref={fileInputRef}
				type="file"
				accept={PROFILE_IMAGE_ACCEPT}
				className="hidden"
				onChange={handleProfileImage}
			/>
		</>
	);
}

'use client';

import Image from 'next/image';

import { useProfileImageUploader } from '../hooks/useProfileImageUploader';
import { PROFILE_IMAGE_ACCEPT } from '../utils/profileImage';

import { PROFILE_PATHS } from '@/constants/assetPath';

interface ProfileImageUploaderProps {
	currentImage?: string;
	onChange: (file: File, preview: string) => void;
}

export default function ProfileImageUploader({ currentImage, onChange }: ProfileImageUploaderProps) {
	const { DEFAULT_PROFILE_SRC, EDIT_ICON_SRC } = PROFILE_PATHS;
	const { preview, fileInputRef, handleButtonClick, handleProfileImage } = useProfileImageUploader({ currentImage, onChange });

	return (
		<>
			<button
				type="button"
				className="bg-discord-bg group relative h-24 w-24 cursor-pointer rounded-full border border-white/10 p-1 transition-all hover:border-primary-500/50"
				onClick={handleButtonClick}>
				<div className="relative h-full w-full overflow-hidden rounded-full">
					<Image src={preview || DEFAULT_PROFILE_SRC} alt="프로필 사진" fill className="object-cover" />
					<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
						<span className="text-[10px] font-bold text-white">CHANGE</span>
					</div>
				</div>
				<div className="bg-primary-500 absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full shadow-lg">
					<Image src={EDIT_ICON_SRC} alt="변경" width={16} height={16} className="brightness-0" />
				</div>
			</button>

			<input ref={fileInputRef} type="file" accept={PROFILE_IMAGE_ACCEPT} className="hidden" onChange={handleProfileImage} />
		</>
	);
}

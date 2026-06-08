'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

import { PROFILE_PATHS } from '@/constants/assetPath';

interface ProfileImageUploaderProps {
	/** 현재 프로필 이미지 URL (기존 이미지 미리보기용) */
	currentImage?: string;
	/** 이미지 변경 시 호출되는 콜백 — 선택된 파일과 미리보기 URL을 전달 */
	onChange: (file: File, preview: string) => void;
}

/**
 * 프로필 이미지를 업로드하고 미리보기를 제공하는 컴포넌트입니다.
 *
 * @component
 * @returns {JSX.Element} 프로필 이미지 업로드 UI를 렌더링합니다.
 */
export default function ProfileImageUploader({ currentImage, onChange }: ProfileImageUploaderProps) {
	const [preview, setPreview] = useState<string | undefined>(currentImage);
	const { DEFAULT_PROFILE_SRC, EDIT_ICON_SRC } = PROFILE_PATHS;
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleProfileImage = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFile = e.target.files?.[0];

			if (!selectedFile) return;

			const reader = new FileReader();

			reader.onload = () => {
				if (typeof reader.result === 'string') {
					const result = reader.result;
					setPreview(result);
					onChange(selectedFile, result);
				}
			};
			reader.readAsDataURL(selectedFile);
		},
		[onChange]
	);

	const handleButtonClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	return (
		<>
			<button
				type="button"
				className="bg-discord-bg group hover:border-primary-500/50 relative h-24 w-24 cursor-pointer rounded-full border border-white/10 p-1 transition-all"
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

			<input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileImage} />
		</>
	);
}

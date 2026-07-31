import { type ChangeEvent,createElement, useCallback, useEffect, useRef, useState } from 'react';

import BasicPopup from '@/components/commons/basic/BasicPopup';
import { getFirstFile, readFileAsDataUrl } from '@/components/me/ProfileEditContainer/utils/profileImage';
import { useModal } from '@/hooks/useModal';

const PROFILE_IMAGE_PREVIEW_FAILED_POPUP = {
	title: '이미지 업로드 실패',
	subTitle: '프로필 이미지를 불러오지 못했습니다. 다른 이미지를 선택해주세요.',
	confirmText: '확인'
};

interface UseProfileImageUploaderParams {
	currentImage?: string;
	onChange: (file: File, preview: string) => void;
}

export function useProfileImageUploader({ currentImage, onChange }: UseProfileImageUploaderParams) {
	const [preview, setPreview] = useState<string | undefined>(currentImage);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { openModal } = useModal();

	useEffect(() => { setPreview(currentImage); }, [currentImage]);

	const handleButtonClick = useCallback(() => { fileInputRef.current?.click(); }, []);

	const applySelectedImage = useCallback(
		(file: File, nextPreview: string) => {
			setPreview(nextPreview);
			onChange(file, nextPreview);
		},
		[onChange]
	);

	const handleProfileImage = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const selectedFile = getFirstFile(e.target.files);

			if (!selectedFile) return;

			try {
				const nextPreview = await readFileAsDataUrl(selectedFile);
				applySelectedImage(selectedFile, nextPreview);
			} catch (err) {
				console.error('프로필 이미지 미리보기 생성 실패', err);
				openModal(createElement(BasicPopup, PROFILE_IMAGE_PREVIEW_FAILED_POPUP), 'profile-image-preview-failed-popup');
			}
		},
		[applySelectedImage, openModal]
	);

	return { preview, fileInputRef, handleButtonClick, handleProfileImage };
}

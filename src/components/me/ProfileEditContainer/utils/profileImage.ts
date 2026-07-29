export const PROFILE_IMAGE_ACCEPT = 'image/*';

export const getFirstFile = (files: FileList | null) => files?.[0] ?? null;

export const readFileAsDataUrl = (file: File) =>
	new Promise<string>((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result);
				return;
			}

			reject(new Error('이미지 파일을 미리보기 URL로 변환하지 못했습니다.'));
		};

		reader.onerror = () => { reject(reader.error ?? new Error('이미지 파일을 읽는 중 오류가 발생했습니다.')); };

		reader.readAsDataURL(file);
	});

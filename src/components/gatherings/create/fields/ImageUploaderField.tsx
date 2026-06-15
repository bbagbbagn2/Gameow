'use client';

import { useEffect, useRef, useState } from 'react';
import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Image from 'next/image';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicInput from '@/components/commons/basic/BasicInput';
import { useFunnelStore } from '@/stores/useFunnelStore';
import { GatheringSchemaType } from '@/utils/schema';

interface ImageUploaderFieldProps {
	errors: FieldErrors<GatheringSchemaType>;
	setValue: UseFormSetValue<GatheringSchemaType>;
	watch: UseFormWatch<GatheringSchemaType>;
}

export default function ImageUploaderField({ errors, setValue, watch }: ImageUploaderFieldProps) {
	const { fileUrl, setFileUrl } = useFunnelStore();
	const [imagePreview, setImagePreview] = useState(fileUrl || '');
	const [imageName, setImageName] = useState('');
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const file = watch('image');

	useEffect(() => {
		if (file instanceof File) {
			const url = URL.createObjectURL(file);
			setFileUrl(url);
			setImagePreview(url);
			setImageName(file.name);
		}
	}, [file, setFileUrl]);

	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex justify-between">
				<input
					id="gathering-image"
					type="file"
					accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
					className="hidden"
					ref={fileInputRef}
					onChange={e => {
						const file = e.target.files?.[0];
						if (file) {
							setValue('image', file, { shouldValidate: true });
							const url = URL.createObjectURL(file);
							setFileUrl(url);
						}
					}}
				/>

				<div className="flex w-full gap-3">
					<div className="flex-1">
						<BasicInput
							id="gathering-image"
							label="이미지"
							placeholder={imageName || '이미지를 첨부해주세요'}
							readOnly
						/>
					</div>
					<div className="flex items-end justify-end">
						<BasicButton type="button" onClick={() => fileInputRef.current?.click()} outlined>
							파일 찾기
						</BasicButton>
					</div>
				</div>
			</div>
			{typeof errors.image?.message === 'string' && (
				<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.image.message}</p>
			)}
			{imagePreview && (
				<div className="m-auto mt-2 mb-4 h-[150px] w-[150px] overflow-hidden rounded-2xl border-2 shadow-md shadow-gray-400">
					<Image src={imagePreview} alt="미리보기 이미지" width={150} height={150} className="object-cover" />
				</div>
			)}
		</div>
	);
}

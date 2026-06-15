'use client';

import { useEffect, useRef, useState } from 'react';
import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Image from 'next/image';

import { ImagePlus } from 'lucide-react';

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
			<label className="text-discord-muted pl-1 text-[11px] font-black tracking-wider uppercase">이미지</label>
			<div>
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

				<button
					type="button"
					onClick={() => fileInputRef.current?.click()}
					className="bg-discord-bg hover:border-primary-500/40 hover:bg-primary-500/5 flex w-full items-center gap-4 rounded-xl border border-dashed border-white/10 p-4 text-left transition-all">
					<div className="bg-discord-card flex h-[92px] w-[92px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/5">
						{imagePreview ? (
							<Image src={imagePreview} alt="미리보기 이미지" width={92} height={92} className="h-full w-full object-cover" />
						) : (
							<ImagePlus className="text-primary-500 h-8 w-8" aria-hidden />
						)}
					</div>
					<div className="min-w-0 flex-1">
						<p className="text-discord-text truncate text-sm font-bold">{imageName || '이미지를 첨부해주세요'}</p>
						<p className="text-discord-muted mt-1 text-xs font-semibold">PNG, JPG, GIF, WEBP</p>
					</div>
					<span className="border-primary-500/30 text-primary-500 rounded-md border px-3 py-2 text-xs font-bold whitespace-nowrap">
						파일 찾기
					</span>
				</button>
			</div>
			{typeof errors.image?.message === 'string' && (
				<p className="leading-sm text-highlight pl-1 text-start text-sm font-semibold">{errors.image.message}</p>
			)}
		</div>
	);
}

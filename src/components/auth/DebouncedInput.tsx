import { debounce } from 'lodash-es';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';

export interface InputProps {
	/** 입력창의 placeholder 텍스트 */
	placeholder: string;
	/** React Hook Form의 register 객체, 폼 관리시 사용(value, onChange, onBlur 등) */
	register?: UseFormRegisterReturn;
	/** 입력창 내부에 추가될 자식 요소(아이콘 등) */
	children?: React.ReactNode;
	/** 커스텀 CSS 클래스 추가 가능 */
	className?: string;
	/** 비밀번호인지 여부 (비밀번호 표시/숨기기 기능) */
	isPassword?: boolean;
	/** 유효하지 않을 때 표시할 에러 메시지 */
	invalidText?: string;
	/** 디바운스 블러일 시 실행될 콜백 */
	onDebouncedBlur?: () => void;
	/** 라벨명 */
	label?: string;
}

export default function DebouncedInput({
	children,
	placeholder,
	isPassword = false,
	register,
	className = '',
	invalidText = '',
	onDebouncedBlur,
	label = ''
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [isShowPw, setIsShowPw] = useState(false);

	const debouncedBlur = useMemo(
		() =>
			debounce(() => {
				onDebouncedBlur?.();
			}, 1000),
		[onDebouncedBlur]
	);

	const handleFocus = () => {
		setIsFocused(true);
		debouncedBlur();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		register?.onChange?.(e);
		debouncedBlur();
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(false);
		debouncedBlur.cancel();
		register?.onBlur?.(e);
	};

	useEffect(() => {
		return () => debouncedBlur.cancel();
	}, [debouncedBlur]);

	return (
		<div className="flex w-full flex-col gap-2">
			<label className="text-discord-muted text-xs font-black tracking-wide uppercase" htmlFor={label}>
				{label}
				{invalidText && <span className="text-destructive ml-1 lowercase font-medium italic">- {invalidText}</span>}
			</label>
			<div
				className={cn(
					'bg-discord-bg relative flex w-full items-center justify-between rounded px-3 py-2.5 transition-all border border-transparent',
					isFocused ? 'ring-2 ring-primary-500/20 border-primary-500' : '',
					invalidText && !isFocused ? 'border-destructive' : '',
					className
				)}>
				<input
					id={label}
					type={isPassword ? (isShowPw ? 'text' : 'password') : 'text'}
					placeholder={placeholder}
					className="text-discord-text w-full bg-transparent text-sm font-medium outline-none placeholder:text-discord-muted/40"
					{...register}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
				{isPassword && (
					<button
						type="button"
						onClick={() => setIsShowPw(prev => !prev)}
						className="ml-2 flex items-center justify-center opacity-60 transition-opacity hover:opacity-100">
						<Image
							src={`/icons/visibility_${isShowPw ? 'on' : 'off'}.svg`}
							width="20"
							height="20"
							alt="toggle password"
							className="brightness-0 invert"
						/>
					</button>
				)}
				{children}
			</div>
		</div>
	);
}


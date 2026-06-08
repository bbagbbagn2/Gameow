//figma input component

import React, { useCallback, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps {
	/** React Hook Form의 register 객체, 폼 관리시 사용 */
	register?: UseFormRegisterReturn;
	/** 유효성 검사 통과 여부(false일 시 invalidText와 함께 빨간 테두리 표시) */
	isValid?: boolean;
	/** 유효하지 않을 때 표시할 에러 메시지 */
	invalidText?: string;
	/** 추가할 커스텀 CSS 클래스명 */
	className?: string;
	/** 입력창의 placeholder 텍스트 */
	placeholder?: string;
}

/**
 * 기본 텍스트 영역 컴포넌트
 *
 * 여러 줄 텍스트 입력을 위한 컴포넌트로, React Hook Form과 호환됩니다.
 * 포커스/블러 상태에 따라 테두리 색상이 변경됩니다.
 *
 * @param props - TextAreaProps 객체
 * @returns JSX.Element
 *
 * @example
 * // 기본 텍스트 영역
 * <BasicTextArea
 *   placeholder="후기를 입력해주세요"
 * />
 *
 * @example
 * // React Hook Form과 함께 사용
 * <BasicTextArea
 *   register={register('description')}
 *   isValid={!!errors.description}
 *   invalidText="내용을 입력해주세요"
 * />
 */
export default function BasicTextArea({
	isValid = true,
	register,
	className = '',
	invalidText = '',
	placeholder = '남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.'
}: TextAreaProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [touched, setTouched] = useState(false);

	const handleFocus = useCallback(() => {
		setIsFocused(true);
		setTouched(true);
	}, []);

	const handleBlur = useCallback(
		(e: React.FocusEvent<HTMLTextAreaElement>) => {
			setIsFocused(false);
			if (register?.onBlur) {
				register.onBlur(e);
			}
		},
		[register]
	);

	const getBorderClass = () => {
		if (!isValid && touched) return 'border-highlight';
		else if (isFocused) return 'border-primary-500/50';
		return 'border-white/5';
	};

	return (
		<div className="flex flex-col gap-1.5">
			<textarea
				placeholder={placeholder}
				// prettier-ignore
				className={`
          h-[120px] w-full resize-none rounded-xl border bg-discord-bg
          px-4 py-3 font-medium text-discord-text outline-none box-border
          placeholder:text-discord-muted/50 transition-all
          ${getBorderClass()}
          ${className}
        `}
				{...register}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			{touched && !isValid && invalidText && (
				<div className="text-highlight pl-1 text-[11px] font-bold tracking-wider uppercase">{invalidText}</div>
			)}
		</div>
	);
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import DebouncedInput from '@/components/auth/DebouncedInput';
import BasicButton from '@/components/commons/basic/BasicButton';

import { SIGNIN_ERRORS } from '@/constants/error';
import { SIGNIN_LABEL, SIGNIN_PLACEHOLDERS } from '@/constants/form';
import { ApiError } from '@/utils/fetch';
import { signinSchema } from '@/utils/schema';

/**
 * Zod 기반 로그인 폼의 입력값 타입
 */
export type SigninFormValues = z.infer<typeof signinSchema>;

interface SigninFormProps {
	/** 제출 시 실행되는 메서드 */
	onSubmit: (data: SigninFormValues) => void;
}

export function SigninForm({ onSubmit }: SigninFormProps) {
	const {
		register,
		handleSubmit,
		trigger,
		setError,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<SigninFormValues>({
		resolver: zodResolver(signinSchema),
		mode: 'onBlur'
	});

	/**
	 * 서버 에러를 폼 에러로 변환하는 핸들러
	 */
	const handleServerError = (error: unknown) => {
		if (error instanceof ApiError) {
			if (error.status === 401) {
				setError('password', { type: 'server', message: SIGNIN_ERRORS.INVALID_CREDENTIALS });
			}
			if (error.status === 404) {
				setError('email', { type: 'server', message: SIGNIN_ERRORS.USER_NOT_FOUND });
			}
		}
	};

	/**
	 * 폼 제출 핸들러
	 */
	const handleFormSubmit = async (data: SigninFormValues) => {
		try {
			await onSubmit(data);
		} catch (error) {
			handleServerError(error);
		}
	};

	return (
		<form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(handleFormSubmit)}>
			<div className="flex w-full flex-col gap-4">
				<DebouncedInput
					label={SIGNIN_LABEL.id}
					placeholder={SIGNIN_PLACEHOLDERS.id}
					register={register('email')}
					invalidText={errors.email?.message}
					onDebouncedBlur={() => trigger('email')}
				/>
				<DebouncedInput
					label={SIGNIN_LABEL.password}
					placeholder={SIGNIN_PLACEHOLDERS.password}
					isPassword
					register={register('password')}
					invalidText={errors.password?.message}
					onDebouncedBlur={() => trigger('password')}
				/>
			</div>
			<div className="mt-2 flex w-full flex-col gap-3">
				<BasicButton isLarge isActive={isValid && !isSubmitting && isDirty} ariaLabel="로그인 확인">
					Login
				</BasicButton>
				<div className="mt-1 flex items-center justify-start gap-1">
					<span className="text-discord-muted text-xs">계정이 필요한가요?</span>
					<Link href="/signup" className="text-primary-400 text-xs hover:underline">
						가입하기
					</Link>
				</div>
			</div>
		</form>
	);
}

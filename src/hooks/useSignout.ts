'use client';

import { useRouter } from 'next/navigation';
import { postSignout } from '@/apis/auths/signout';
import { useTokenStore } from '@/stores/token';
import { useUserStore } from '@/stores/user';

/**
 * 전역 로그아웃 기능을 제공하는 커스텀 훅
 */
export function useSignout() {
	const router = useRouter();
	const signoutToken = useTokenStore(state => state.signoutUser);
	const signoutUser = useUserStore(state => state.signoutUser);

	const handleSignout = async () => {
		try {
			// API 로그아웃 요청 (세션 무효화 등)
			await postSignout();
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			// 로컬 상태 초기화
			signoutToken();
			signoutUser();
			
			// 홈으로 이동
			router.replace('/');
		}
	};

	return { handleSignout };
}

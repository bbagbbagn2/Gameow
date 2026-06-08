import type { Meta, StoryObj } from '@storybook/nextjs';

import BasicButton from '@/components/commons/basic/BasicButton';
import ModalContainer from '@/components/commons/ModalContainer';
import { useModal } from '@/hooks/useModal';
import { ModalStoreProvider } from '@/providers/ModalProvider';
import { ApiError } from '@/utils/fetch';

import RequiredLoginPopup from './RequiredLoginPopup';
import ServerErrorPopup from './ServerErrorPopup';
import SignupFailurePopup from './SignupFailurePopup';
import SignupSuccessPopup from './SignupSuccessPopup';

const meta: Meta = {
	title: 'Auth/Popup',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `### 🧾 Auth Popup
				회원 인증 및 접근 권한과 관련된 팝업 모음입니다.

				#### 📚 구조
				- 모달 상태 관리는 \`ModalStoreProvider\`
				- 실제 렌더링은 \`ModalContainer\`
				- 내부 콘텐츠는 \`SignupSuccessPopup\`, \`SignupFailurePopup\`, \`RequiredLoginPopup\`, \`ServerErrorPopup\`

				#### 🧩 팝업 목록
				1. ✅ 회원가입 성공 (\`SignupSuccessPopup\`)
				2. ⚠️ 회원가입 실패 (\`SignupFailurePopup\`)
				3. 🔒 로그인 필요 (\`RequiredLoginPopup\`)
				4. 💥 서버 오류 (\`ServerErrorPopup\`)
				`
			}
		}
	}
};

export default meta;
type Story = StoryObj;

/** ✅ 회원가입 성공 팝업 */
export const SignupSuccess: Story = {
	render: () => (
		<ModalStoreProvider>
			<DemoTrigger type="signup-success" />
			<ModalContainer />
		</ModalStoreProvider>
	),
	name: '회원가입 성공'
};

/** ⚠️ 회원가입 실패 팝업 */
export const SignupFailure: Story = {
	render: () => (
		<ModalStoreProvider>
			<DemoTrigger type="signup-failure" />
			<ModalContainer />
		</ModalStoreProvider>
	),
	name: '회원가입 실패'
};

/** 🔒 로그인 필요 팝업 */
export const RequiredLogin: Story = {
	render: () => (
		<ModalStoreProvider>
			<DemoTrigger type="required-login" />
			<ModalContainer />
		</ModalStoreProvider>
	),
	name: '로그인 필요'
};

/** 💥 서버 오류 팝업 */
export const ServerError: Story = {
	render: () => (
		<ModalStoreProvider>
			<DemoTrigger type="server-error" />
			<ModalContainer />
		</ModalStoreProvider>
	),
	name: '서버 오류'
};

/**
 * 내부에서 openModal을 직접 호출할 수 있는 테스트 버튼
 */
function DemoTrigger({ type }: { type: 'signup-success' | 'signup-failure' | 'required-login' | 'server-error' }) {
	const { openModal } = useModal();

	const handleClick = () => {
		const error = new ApiError(401, 'Unauthorized', {
			code: 'UNAUTHORIZED',
			message: 'Authorization 헤더가 필요합니다'
		});

		switch (type) {
			case 'signup-success':
				openModal(<SignupSuccessPopup />);
				break;
			case 'signup-failure':
				openModal(<SignupFailurePopup error={error} />);
				break;
			case 'required-login':
				openModal(<RequiredLoginPopup next="/mypage" />);
				break;
			case 'server-error':
				openModal(<ServerErrorPopup />);
				break;
		}
	};

	const labelMap = {
		'signup-success': '회원가입 성공 팝업 열기',
		'signup-failure': '회원가입 실패 팝업 열기',
		'required-login': '로그인 필요 팝업 열기',
		'server-error': '서버 오류 팝업 열기'
	};

	return (
		<BasicButton isActive onClick={handleClick}>
			{labelMap[type]}
		</BasicButton>
	);
}

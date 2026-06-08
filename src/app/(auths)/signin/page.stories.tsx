import type { Meta, StoryObj } from '@storybook/nextjs';

import AuthLayout from '@/app/(auths)/layout';
import ModalContainer from '@/components/commons/ModalContainer';
import { ModalStoreProvider } from '@/providers/ModalProvider';

import SigninPage from './page';

const meta: Meta<typeof SigninPage> = {
	title: 'Pages/Signin',
	component: SigninPage,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `### 🔐 SigninPage
				로그인 전체 페이지입니다.

				- 구성 요소: \`SigninForm\` + \`ServerErrorPopup\`
				- 로그인 성공 시: \`router.push(next)\`를 통해 이동
				- 실패 시: \`ApiError\` 상태 코드(500)에 따라 \`ServerErrorPopup\` 모달 표시
				- 모달 상태 관리: \`ModalStoreProvider\` / 실제 렌더링: \`ModalContainer\`
				- 반응형 테스트: Desktop, Tablet, Mobile 각각 확인 가능
				`
			}
		}
	},
	globals: {
		viewport: { value: 'desktop', isRotated: false }
	}
};

export default meta;
type Story = StoryObj<typeof SigninPage>;

/**
 * 🖥️ Desktop 버전
 */
export const Desktop: Story = {
	render: () => (
		<ModalStoreProvider>
			<AuthLayout>
				<SigninPage />
			</AuthLayout>
			<ModalContainer />
		</ModalStoreProvider>
	),
	globals: {
		viewport: { value: 'desktop', isRotated: false }
	}
};

/**
 * 💻 Tablet 버전
 */
export const Tablet: Story = {
	render: () => (
		<ModalStoreProvider>
			<AuthLayout>
				<SigninPage />
			</AuthLayout>
			<ModalContainer />
		</ModalStoreProvider>
	),
	globals: {
		viewport: { value: 'tablet', isRotated: false }
	}
};

/**
 * 📱 Mobile 버전
 */
export const Mobile: Story = {
	render: () => (
		<ModalStoreProvider>
			<AuthLayout>
				<SigninPage />
			</AuthLayout>
			<ModalContainer />
		</ModalStoreProvider>
	),
	globals: {
		viewport: { value: 'mobile', isRotated: false }
	}
};

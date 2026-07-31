import type { Meta, StoryObj } from '@storybook/nextjs';

import { SignupForm } from '.';

const meta: Meta<typeof SignupForm> = {
	title: 'Auth/SignupForm',
	component: SignupForm,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		viewport: { defaultViewport: 'desktop' },
		docs: {
			description: {
				component: `### 🧾 SignupForm
				React Hook Form + Zod 기반의 회원가입 폼입니다.

				- 필드: 이름, 이메일, 닉네임, 비밀번호, 비밀번호 확인
				- 유효성 검사: \`zodResolver\`
				- 제출 버튼 활성화 조건: \`isValid && isDirty && !isSubmitting\`
				- 디자인 시스템 버튼: \`<BasicButton />\`
				`
			}
		}
	},
	args: {
		onSubmit: data => {
			console.log('Form submitted:', data);
			alert('회원가입 시도!');
		}
	}
};

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Default: Story = {};

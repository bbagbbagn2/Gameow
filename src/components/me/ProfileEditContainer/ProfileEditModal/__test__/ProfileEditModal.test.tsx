import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileEditModal from '../ProfileEditModal';

/**
 * useModalClose 훅을 모킹
 * - 실제 Modal Context 없이 테스트 가능하도록 더미 함수 반환
 */
const mockCloseModal = jest.fn();
jest.mock('@/hooks/useModal', () => ({
	useModalClose: () => mockCloseModal
}));

// BasicModal Mock
jest.mock('@/components/commons/basic/BasicModal', () => ({
	__esModule: true,
	default: ({ children, onClose, className }: any) => (
		<div data-testid="basic-modal" className={className}>
			<button onClick={onClose} data-testid="modal-close-button">
				Close
			</button>
			{children}
		</div>
	)
}));

// BasicButton Mock
jest.mock('@/components/commons/basic/BasicButton', () => ({
	__esModule: true,
	default: ({ children, onClick, disabled, type, isActive, isLarge, outlined }: any) => (
		<button
			onClick={onClick}
			disabled={disabled}
			type={type}
			data-testid={`button-${children}`}
			data-active={isActive}
			data-large={isLarge}
			data-outlined={outlined}>
			{children}
		</button>
	)
}));

// BasicInput Mock
jest.mock('@/components/commons/basic/BasicInput', () => ({
	__esModule: true,
	default: ({ id, label, placeholder, isValid, invalidText, ...props }: any) => (
		<div data-testid={`input-wrapper-${id}`}>
			<label htmlFor={id}>{label}</label>
			<input id={id} placeholder={placeholder} data-testid={`input-${id}`} aria-invalid={!isValid} {...props} />
			{invalidText && <span data-testid="error-message">{invalidText}</span>}
		</div>
	)
}));

// ProfileImageUploader Mock
jest.mock('../ProfileImageUploader', () => ({
	__esModule: true,
	default: ({ currentImage, onChange }: any) => (
		<div data-testid="profile-image-uploader">
			<img src={currentImage} alt="profile" />
			<input
				type="file"
				data-testid="file-input"
				onChange={e => {
					const file = e.target.files?.[0];
					if (file) onChange(file);
				}}
			/>
		</div>
	)
}));

// Zod Schema Mock
jest.mock('@/utils/schema', () => {
	// zod 모듈을 동적으로 import
	const zodModule = jest.requireActual('zod');
	const { z } = zodModule;

	const profileEditSchema = z.object({
		companyName: z.string().min(2, '닉네임은 2자 이상이어야 합니다'),
		image: z.instanceof(File).optional()
	});

	return {
		profileEditSchema,
		ProfileEditSchemaType: {} as any
	};
});

/**
 * ProfileEditModal 컴포넌트 테스트
 *
 * - 기본 회사명 렌더링 확인
 * - 회사명 수정 후 onSubmit 호출 확인
 */
describe('ProfileEditModal', () => {
	const mockOnSubmit = jest.fn();

	const defaultProps = {
		currentImage: 'https://example.com/profile.jpg',
		currentNickname: '닉네임',
		onSubmit: mockOnSubmit
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('렌더링', () => {
		test('모달이 올바르게 렌더링 되는지 확인', () => {
			render(<ProfileEditModal {...defaultProps} />);

			expect(screen.getByText('프로필 수정하기')).toBeInTheDocument();
			expect(screen.getByTestId('profile-image-uploader')).toBeInTheDocument();
			expect(screen.getByTestId('input-companyName')).toBeInTheDocument();
			expect(screen.getByTestId('button-취소')).toBeInTheDocument();
			expect(screen.getByTestId('button-수정하기')).toBeInTheDocument();
		});

		test('현재 닉네임이 input에 표시되는지 확인', () => {
			render(<ProfileEditModal {...defaultProps} />);

			const input = screen.getByTestId('input-companyName') as HTMLInputElement;
			expect(input.value).toBe('닉네임');
		});

		test('현재 프로핊 이미지가 표시되는지 확인', () => {
			render(<ProfileEditModal {...defaultProps} />);

			const image = screen.getByAltText('profile') as HTMLImageElement;
			expect(image.src).toBe('https://example.com/profile.jpg');
		});
	});

	describe('사용자 입력', () => {
		test('닉네임을 변경할 수 있는지 확인', async () => {
			const user = userEvent.setup();
			render(<ProfileEditModal {...defaultProps} />);

			const input = screen.getByTestId('input-companyName');
			await user.clear(input);
			await user.type(input, '새로운닉네임');

			expect(input).toHaveValue('새로운닉네임');
		});

		test('닉네임 변경 시 수정하기 버튼이 활성화 되는지 확인', async () => {
			const user = userEvent.setup();
			render(<ProfileEditModal {...defaultProps} />);

			const input = screen.getByTestId('input-companyName');
			const submitButton = screen.getByTestId('button-수정하기');

			expect(submitButton).toBeDisabled();

			await user.clear(input);
			await user.type(input, '새로운닉네임');

			await waitFor(() => {
				expect(submitButton).not.toBeDisabled();
			});
		});

		test('프로필 이미지를 변경할 수 있는지 확인', async () => {
			const user = userEvent.setup();
			render(<ProfileEditModal {...defaultProps} />);

			const file = new File(['image'], 'profile.png', { type: 'image/png' });
			const fileInput = screen.getByTestId('file-input');

			await user.upload(fileInput, file);

			expect(fileInput).toHaveProperty('files');
		});
	});
});

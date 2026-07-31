import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import ProfileImageUploader from '@/components/me/ProfileEditContainer/components/ProfileImageUploader';
import { ModalStoreProvider } from '@/providers/ModalProvider';

const renderProfileImageUploader = (props: React.ComponentProps<typeof ProfileImageUploader>) =>
	render(
		<ModalStoreProvider>
			<ProfileImageUploader {...props} />
		</ModalStoreProvider>
	);

describe('ProfileImageUploader', () => {
	test('기본 이미지를 렌더링하는지 확인', () => {
		renderProfileImageUploader({ onChange: () => {} });
		expect(screen.getByAltText('프로필 사진')).toBeInTheDocument();
	});

	test('파일을 업로드하면 onChange가 호출되는지 확인', async () => {
		const handleChange = jest.fn();
		renderProfileImageUploader({ onChange: handleChange });

		const file = new File(['임시 프로필 사진'], 'text.png', { type: 'image/png' });
		const input = screen.getByRole('button').nextSibling as HTMLInputElement;

		fireEvent.change(input, { target: { files: [file] } });

		await waitFor(() => {
			expect(handleChange).toHaveBeenCalledWith(file, expect.any(String));
		});
	});
});

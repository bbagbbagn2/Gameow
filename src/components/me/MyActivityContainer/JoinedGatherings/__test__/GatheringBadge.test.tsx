import { render, screen } from '@testing-library/react';
import type { JoinedGathering } from '@/types/response/gatherings';
import GatheringBadge from '../GatheringBadge';

// Mock ChipState 컴포넌트
jest.mock('@/components/commons/ChipState', () => {
	return function DummyChipState({ state }: { state: string }) {
		return <div data-testid={`chip-state-${state}`}>{state}</div>;
	};
});

describe('GatheringBadge 컴포넌트', () => {
	const mockGathering: JoinedGathering = {
		teamId: 1105,
		id: 1,
		type: 'DALLAEMFIT',
		name: '테스트 모임',
		dateTime: '2026-03-15T10:00:00Z',
		registrationEnd: '2026-03-14T23:59:59Z',
		location: '건대입구',
		participantCount: 5,
		capacity: 10,
		image: 'https://example.com/image.jpg',
		createdBy: 1,
		canceledAt: null,
		joinedAt: '2026-03-01T10:00:00Z',
		isCompleted: false,
		isReviewed: false
	};

	it('모임이 완료되었을 때 "done" 상태만 표시한다', () => {
		const completedGathering: JoinedGathering = {
			...mockGathering,
			isCompleted: true
		};

		render(<GatheringBadge gathering={completedGathering} isFull={false} />);

		expect(screen.getByTestId('chip-state-done')).toBeInTheDocument();
		expect(screen.queryByTestId('chip-state-scheduled')).not.toBeInTheDocument();
		expect(screen.queryByTestId('chip-state-confirmed')).not.toBeInTheDocument();
		expect(screen.queryByTestId('chip-state-waiting')).not.toBeInTheDocument();
	});

	it('모임이 완료되지 않았고 정원이 찼을 때 "scheduled"와 "confirmed" 상태를 표시한다', () => {
		render(<GatheringBadge gathering={mockGathering} isFull={true} />);

		expect(screen.getByTestId('chip-state-scheduled')).toBeInTheDocument();
		expect(screen.getByTestId('chip-state-confirmed')).toBeInTheDocument();
		expect(screen.queryByTestId('chip-state-done')).not.toBeInTheDocument();
		expect(screen.queryByTestId('chip-state-waiting')).not.toBeInTheDocument();
	});

	it('모임이 완료되지 않았고 정원이 차지 않았을 때 "scheduled"와 "waiting" 상태를 표시한다', () => {
		render(<GatheringBadge gathering={mockGathering} isFull={false} />);

		expect(screen.getByTestId('chip-state-scheduled')).toBeInTheDocument();
		expect(screen.getByTestId('chip-state-waiting')).toBeInTheDocument();
		expect(screen.queryByTestId('chip-state-done')).not.toBeInTheDocument();
		expect(screen.queryByTestId('chip-state-confirmed')).not.toBeInTheDocument();
	});

	it('완료된 모임에서는 정원 상태와 관계없이 isFull이 무시된다', () => {
		const completedGathering: JoinedGathering = {
			...mockGathering,
			isCompleted: true
		};

		render(<GatheringBadge gathering={completedGathering} isFull={true} />);

		expect(screen.getByTestId('chip-state-done')).toBeInTheDocument();
		expect(screen.queryByTestId('chip-state-confirmed')).not.toBeInTheDocument();
	});

	it('올바른 구조로 렌더링된다', () => {
		const { container } = render(<GatheringBadge gathering={mockGathering} isFull={false} />);

		const rootDiv = container.querySelector('.flex.flex-col.gap-3');
		expect(rootDiv).toBeInTheDocument();

		const stateContainer = rootDiv?.querySelector('.flex.gap-2');
		expect(stateContainer).toBeInTheDocument();
	});
});

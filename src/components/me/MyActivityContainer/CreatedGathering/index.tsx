import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getGatherings } from '@/apis/gatherings';
import { useUserStore } from '@/stores/user';
import { Gathering } from '@/types/response/gatherings';

import NoDataMessage from '../../../commons/NoDataMessage/NoDataMessage';
import CardLayout from '../common/CardLayout/CardLayout';

export default function CreatedGatherings() {
	const { user } = useUserStore();
	const router = useRouter();
	const [gatherings, setGatherings] = useState<Gathering[]>([]);

	useEffect(() => {
		const fetchGatherings = async () => {
			const data = await getGatherings(`createdBy=${user?.userId}`);
			setGatherings(data as Gathering[]);
		};
		fetchGatherings();
	}, [user?.userId]);

	if (gatherings.length === 0) {
		return <NoDataMessage text="아직 만든 크루가 없어요" />;
	}

	return (
		<div className="flex flex-1 cursor-pointer flex-col gap-6">
			{gatherings.map(gathering => (
				<div onClick={() => router.push(`/gatherings/${gathering.id}`)} key={gathering.id}>
					<CardLayout gathering={gathering}></CardLayout>
				</div>
			))}
		</div>
	);
}

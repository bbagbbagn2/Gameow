import { GetReviewsResponse, ReviewResponse } from '@/types/response/reviews';
import FilterSection, { FilterData } from './FilterSection';
import ReviewItem from './ReviewItem';
import BasicPagination from '../commons/basic/BasicPagination';
import Image from 'next/image';

import ReviewSkeleton from './ReviewSkeleton';

export default function ReviewSection({
	reviewData,
	isLoading,
	callbackOnFilterChange,
	callBackOnPageChange
}: {
	reviewData: GetReviewsResponse | undefined;
	isLoading: boolean;
	callbackOnFilterChange: (filter: FilterData) => void;
	callBackOnPageChange: (offset: number) => void;
}) {
	const handleFilterChange = (newFilterData: FilterData) => {
		callbackOnFilterChange(newFilterData);
	};

	const handlePageChange = (page: number) => {
		callBackOnPageChange(page);
	};

	return (
		<div className="flex flex-col gap-8">
			{/* 필터 섹션 영역 */}
			<div className="bg-discord-surface rounded-xl border border-white/5 p-4 shadow-lg">
				<FilterSection onFilterChange={handleFilterChange} />
			</div>

			{isLoading ? (
				<div className="tb:grid-cols-2 pc:grid-cols-3 grid grid-cols-1 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<ReviewSkeleton key={i} />
					))}
				</div>
			) : reviewData && reviewData.data.length > 0 ? (
				<>
					<div className="tb:grid-cols-2 pc:grid-cols-3 grid grid-cols-1 gap-6">
						{reviewData.data.map((item: ReviewResponse) => (
							<ReviewItem key={item.id} reviewData={item} />
						))}
					</div>
					<div className="mt-8 flex justify-center">
						<BasicPagination
							currentPage={reviewData?.currentPage}
							totalPages={reviewData?.totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			) : (
				<div className="bg-discord-surface flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-12 text-center">
					<div className="bg-discord-bg mb-6 flex h-20 w-20 items-center justify-center rounded-full opacity-20">
						<Image src="/images/no_data.svg" alt="No Data" width={48} height={48} className="grayscale" />
					</div>
					<p className="text-discord-text text-xl font-bold">아직 작성된 리뷰가 없네요</p>
					<p className="text-discord-muted mt-2 text-base">첫 번째 리뷰의 주인공이 되어보세요!</p>
				</div>
			)}
		</div>
	);
}

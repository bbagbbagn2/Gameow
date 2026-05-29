'use client';

import { differenceInDays, isPast, isSameDay, startOfDay } from 'date-fns';

import { formatDateAndTime } from '@/utils/date';
import { CLOSED_GATHERING_MESSAGE, FULL_GATHERING_MESSAGE } from '@/constants/messages';
import { useWishlistStore } from '@/stores/wishlist';
import type { Gathering } from '@/types/response/gatherings';

import Image from 'next/image';
import HeartButton from '@/app/(home)/HeartButton';
import ChipInfo from '@/components/commons/ChipInfo';
import ClassProgressBar from '@/components/commons/ClassProgressBar';
import Tag from '@/components/commons/Tag';

interface CardListProps {
	data: Gathering;
}

/**
 * 찜한 모임 카드
 * @param data - 모임 정보
 */
export default function CardList({ data }: CardListProps) {
	const { id, image, name, location, participantCount, capacity, registrationEnd, dateTime } = data;
	const now = new Date();
	const endDate = new Date(registrationEnd);
	const isClosed = participantCount >= capacity || isPast(new Date(registrationEnd));

	const removeWish = useWishlistStore(state => state.removeWish);
	let tagText = '';
	let genre = '';
	switch (location) {
		case '건대입구':
			genre = 'AOS';
			break;
		case '을지로3가':
			genre = 'Adventure';
			break;
		case '신림':
			genre = 'FPS';
			break;
		case '홍대입구':
			genre = 'RPG';
			break;
	}

	if (isPast(endDate)) {
		tagText = '모집 마감';
	} else if (isSameDay(now, endDate)) {
		tagText = `오늘 ${endDate.getHours()}시 마감`;
	} else {
		const diffDays = differenceInDays(startOfDay(endDate), startOfDay(now));
		tagText = diffDays <= 0 ? '모집 마감' : `${diffDays}일 후 마감`;
	}

	return (
		<article className="bg-discord-card hover:bg-discord-hover group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5 transition-all hover:-translate-y-1 hover:shadow-2xl">
			{/* 상단 이미지 영역 */}
			<div className="relative h-48 w-full shrink-0 overflow-hidden shadow-inner">
				<Image src={image} alt={name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

				{/* 마감 태그 */}
				{!isClosed && (
					<div className="absolute top-3 right-3">
						<Tag text={tagText} />
					</div>
				)}

				{/* 장르 태그 */}
				<div className="absolute bottom-3 left-3">
					<span className="bg-primary-500 text-discord-bg rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
						{genre}
					</span>
				</div>
			</div>

			{/* 하단 정보 영역 */}
			<div className="flex flex-1 flex-col p-5">
				<div className="flex flex-col gap-3">
					<div className="flex items-start justify-between">
						<div className="flex flex-col gap-1">
							<h3 className="text-lg font-bold text-white transition-colors group-hover:text-primary-400">
								{name}
							</h3>
							<div className="flex items-center gap-2 text-xs">
								<span className="text-primary-500 font-bold uppercase tracking-tighter">
									{formatKoreanDate(dateTime)}
								</span>
								<span className="text-discord-muted">•</span>
								<span className="text-discord-muted font-semibold">{location}</span>
							</div>
						</div>
						{!isClosed && (
							<div className="z-base">
								<HeartButton id={id} />
							</div>
						)}
					</div>

					<div className="flex items-center gap-3">
						<div className="bg-discord-bg flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold">
							<Image src="/icons/person.svg" alt="인원" width={12} height={12} className="opacity-60" />
							<span className="text-discord-text">
								{participantCount} / {capacity}
							</span>
						</div>
						{participantCount >= capacity && (
							<span className="text-[10px] font-black text-destructive italic uppercase">Full House</span>
						)}
					</div>
				</div>
			</div>

			{/* 마감/종료 오버레이 (Discord 스타일) */}
			{isClosed && (
				<div
					className="bg-discord-bg/90 absolute inset-0 z-layout flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm"
					onClick={e => e.stopPropagation()}>
					<p className="text-discord-text text-sm font-bold leading-relaxed">
						{CLOSED_GATHERING_MESSAGE.title}
						<br />
						<span className="text-discord-muted font-medium">{CLOSED_GATHERING_MESSAGE.subTitle}</span>
					</p>
					<button
						onClick={e => {
							e.stopPropagation();
							removeWish(id);
						}}
						className="bg-primary-500 text-discord-bg mt-6 flex items-center gap-2 rounded-md px-4 py-2 text-xs font-black transition-all active:scale-95 uppercase tracking-tighter">
						<Image src="/icons/bye.svg" alt="remove" width={16} height={16} className="brightness-0" />
						보내주기
					</button>
				</div>
			)}
		</article>
	);
}


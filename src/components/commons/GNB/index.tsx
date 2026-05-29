'use client';

import { postSignout } from '@/apis/auths/signout';

import { DropdownMenu } from '@/components/commons/GNB/DropdownMenu';
import { PROFILE_PATHS } from '@/constants/assetPath';
import { DROPDOWN_MENU_OPTIONS, NAVBAR_MENU_LINKS } from '@/constants/options';
import { useAuth } from '@/hooks/useAuth';
import { useScreenSize } from '@/hooks/useScreenSize';
import { useTokenStore } from '@/stores/token';
import { useUserStore } from '@/stores/user';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SessionTimer from './SessionTimer';

const PROFILE_BOX_GLOW = '[box-shadow:0_0_2px_#b3b3b3,0_0_4px_#b3b3b3,0_0_8px_#b3b3b3,0_0_16px_#b3b3b3]';
/**
 * GNB(Global Navigation Bar)
 * - 로그인 상태에 따라 다른 UI를 렌더링함
 * - 마이페이지, 로그아웃, 로그인 등 주요 내비게이션 기능 포함
 */
export default function GNB() {
	const router = useRouter();
	const pathname = usePathname();
	const user = useUserStore(state => state.user);
	const hasHydrated = useUserStore(state => state.hasHydrated);
	const signoutToken = useTokenStore(state => state.signoutUser);
	const signoutUser = useUserStore(state => state.signoutUser);
	const { isAuthenticated } = useAuth();
	const screenSize = useScreenSize();

	const handleDropdownMenuClick = async (value: string | number) => {
		if (value === DROPDOWN_MENU_OPTIONS[0].value) {
			router.push('/me');
			return;
		}

		if (!pathname.startsWith('/me')) {
			await postSignout();
			signoutToken();
			signoutUser();
			return;
		}

		router.replace('/');
		setTimeout(async () => {
			await postSignout();
			signoutToken();
			signoutUser();
		}, 800);
	};

	const handleSigninClick = () => {
		if (pathname === '/signin') return;
		const path = pathname !== '/' ? '/signin?redirectTo=' + encodeURIComponent(pathname) : '/signin';
		router.push(path);
	};

	return (
		<header className="z-layout bg-discord-bg/80 sticky top-0 w-full border-b border-white/5 backdrop-blur-md">
			<div className="mb:px-6 mb:h-16 flex h-14 w-full items-center justify-center px-4">
				<div className="tb:max-w-300 flex w-full items-center justify-between">
					<div className="flex items-center gap-8">
						<h1 className="relative h-8 w-32">
							<Link href="/" className="flex items-center gap-2">
								<Image
									priority
									src={screenSize === 'desktop' ? '/images/text_logo.svg' : '/images/profile_logo.svg'}
									alt="GAMEOW"
									width={screenSize === 'desktop' ? 120 : 32}
									height={32}
									className="object-contain brightness-0 invert"
								/>
							</Link>
						</h1>
						<nav className="hidden items-center gap-1 tb:flex">
							{NAVBAR_MENU_LINKS.map(({ href, label }) => (
								<Link
									key={href}
									href={href}
									className={cn(
										'rounded-md px-4 py-2 text-sm font-bold transition-all uppercase tracking-wide',
										pathname === href
											? 'bg-primary-500/10 text-primary-400'
											: 'text-discord-muted hover:bg-discord-hover hover:text-discord-text'
									)}>
									{label}
								</Link>
							))}
						</nav>
					</div>

					{!hasHydrated ? (
						<div className="h-10 w-24 animate-pulse rounded-md bg-white/5" />
					) : isAuthenticated ? (
						<div className="flex items-center gap-4">
							<div className="hidden tb:block">
								<SessionTimer />
							</div>
							<DropdownMenu>
								<DropdownMenu.Trigger>
									<div className="bg-discord-surface group relative size-10 cursor-pointer overflow-hidden rounded-full border border-white/10 p-0.5 transition-all hover:border-primary-500/50">
										<div className="relative h-full w-full overflow-hidden rounded-full">
											<Image
												priority
												src={user?.image || PROFILE_PATHS.DEFAULT_PROFILE_SRC}
												alt="프로필 사진"
												fill
												className="object-cover"
											/>
										</div>
									</div>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content options={DROPDOWN_MENU_OPTIONS} onClick={handleDropdownMenuClick} />
							</DropdownMenu>
						</div>
					) : (
						<button
							onClick={handleSigninClick}
							className="bg-primary-500 text-discord-bg hover:bg-primary-400 rounded-md px-5 py-2 text-sm font-black transition-all active:scale-95 uppercase tracking-tighter">
							Login
						</button>
					)}
				</div>
			</div>
			{/* Discord 스타일의 얇고 세련된 프로그레스 바 (선택 사항) */}
			<div className="bg-primary-500/20 h-[1px] w-full">
				<div className="bg-primary-500 h-full w-full opacity-50" />
			</div>
		</header>
	);
}


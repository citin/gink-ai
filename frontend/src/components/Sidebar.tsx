import { Thread as ThreadType } from '../types/thread';
import ThreadSidebarItem from './ThreadSidebarItem';
import { UseMutateFunction } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';

interface SidebarProps {
	threads: ThreadType[];
	currentThread: ThreadType | null;
	setCurrentThread: (thread: ThreadType) => void;
	toggleFavorite: UseMutateFunction<ThreadType, Error, { threadId: string; isFavourite: boolean }, unknown>;
}

function Sidebar({ threads, currentThread, setCurrentThread, toggleFavorite }: SidebarProps) {
	// Derive favorite and non-favorite threads
	const favoriteThreads = threads.filter(thread => thread.isFavourite);
	const nonFavoriteThreads = threads.filter(thread => !thread.isFavourite);

	// Refs to track which threads have changed
	const prevThreadsRef = useRef<ThreadType[]>([]);

	// Keep track of which threads have changed
	useEffect(() => {
		prevThreadsRef.current = threads;
	}, [threads]);

	const handleToggleFavorite = (threadId: string, isFavourite: boolean) => {
		toggleFavorite({ threadId, isFavourite });
	};

	return (
		<div className="drawer-side">
			<label htmlFor="my-drawer" className="drawer-overlay"></label>
			<div className="menu bg-base-200 w-80 min-h-full p-4 text-base-content">
				<div className="flex items-center mb-6">
					<h1 className="text-2xl font-bold">Gink AI</h1>
				</div>

				{/* Favorite Threads */}
				<div>
					<h2 className="menu-title text-xs font-semibold uppercase text-opacity-60">Favorites</h2>
					<ul className="menu menu-sm gap-1 w-full">
						{favoriteThreads.map((thread) => (
							<div
								key={thread.id}
								className="thread-item animate-fade-in transition-all duration-300"
							>
								<ThreadSidebarItem
									thread={thread}
									currentThread={currentThread}
									setCurrentThread={setCurrentThread}
									onToggleFavorite={handleToggleFavorite}
								/>
							</div>
						))}
						{favoriteThreads.length === 0 && (
							<li className="px-4 py-2 text-sm text-opacity-70">No favorite threads</li>
						)}
					</ul>
				</div>

				{/* All Threads */}
				<div>
					<h2 className="menu-title text-xs font-semibold uppercase text-opacity-60">All Threads</h2>
					<ul className="menu menu-sm gap-1 w-full">
						{nonFavoriteThreads.map((thread) => (
							<div
								key={thread.id}
								className="thread-item animate-fade-in transition-all duration-300"
							>
								<ThreadSidebarItem
									thread={thread}
									currentThread={currentThread}
									setCurrentThread={setCurrentThread}
									onToggleFavorite={handleToggleFavorite}
								/>
							</div>
						))}
					</ul>
				</div>

				{/* Create New Thread Button */}
				<div className="mt-6">
					<button className="btn btn-primary w-full gap-2">
						<i className="i-heroicons-plus"></i>
						New Thread
					</button>
				</div>
			</div>
		</div>
	);
}

export default Sidebar; 

import { Thread as ThreadType } from '../types/thread';
import ThreadSidebarItem from './ThreadSidebarItem';

interface SidebarProps {
	threads: ThreadType[];
	currentThread: ThreadType | null;
	setCurrentThread: (thread: ThreadType) => void;
}

function Sidebar({ threads, currentThread, setCurrentThread }: SidebarProps) {
	const favoriteThreads = threads.filter(thread => thread.isFavourite);
	const nonFavoriteThreads = threads.filter(thread => !thread.isFavourite);

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
							<ThreadSidebarItem
								key={thread.id}
								thread={thread}
								currentThread={currentThread}
								setCurrentThread={setCurrentThread}
								isFavorite={true}
							/>
						))}
					</ul>
				</div>

				{/* All Threads */}
				<div>
					<h2 className="menu-title text-xs font-semibold uppercase text-opacity-60">All Threads</h2>
					<ul className="menu menu-sm gap-1 w-full">
						{nonFavoriteThreads.map((thread) => (
							<ThreadSidebarItem
								key={thread.id}
								thread={thread}
								currentThread={currentThread}
								setCurrentThread={setCurrentThread}
							/>
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

import { Thread as ThreadType } from '../types/thread';

interface ThreadSidebarItemProps {
	thread: ThreadType;
	currentThread: ThreadType | null;
	setCurrentThread: (thread: ThreadType) => void;
	isFavorite?: boolean;
}

function ThreadSidebarItem({
	thread,
	currentThread,
	setCurrentThread,
	isFavorite = false,
}: ThreadSidebarItemProps) {
	const isActive = currentThread?.id === thread.id;

	const itemClass = isActive ? 'menu-active' : '';

	const iconClass = isFavorite
		? 'fa-solid fa-star'
		: 'fa-regular fa-star';

	const spanClass = `badge badge-sm ${isFavorite ? 'badge-primary' : 'badge-secondary'} ml-auto`;


	return (
		<li key={thread.id} className="w-full">
			<a className={itemClass} onClick={() => setCurrentThread(thread)}>
				<i className={iconClass} />
				{thread.title}
				<span className={spanClass}>
					{thread.messages.length}
				</span>
			</a>
		</li>
	);
}

export default ThreadSidebarItem;
export type { ThreadSidebarItemProps }; 

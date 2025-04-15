import { Thread as ThreadType } from '../types/thread';
import { useState } from 'react';

interface ThreadSidebarItemProps {
  thread: ThreadType;
  currentThread: ThreadType | null;
  setCurrentThread: (thread: ThreadType) => void;
  isFavorite?: boolean;
  onToggleFavorite: (threadId: string, isFavourite: boolean) => void;
}

function ThreadSidebarItem({
  thread,
  currentThread,
  setCurrentThread,
  onToggleFavorite
}: ThreadSidebarItemProps) {
  const isActive = currentThread?.id === thread.id;
  const [isAnimating, setIsAnimating] = useState(false);

  // Class for the menu item
  const itemClass = isActive ? 'menu-active' : '';

  const iconClass = `
		${thread.isFavourite ? 'fa-solid fa-star text-yellow-400' : 'fa-regular fa-star'}
		transition-all duration-300 ease-in-out 
		hover:scale-125 
		${isAnimating ? 'animate-ping-once' : ''}
	`;

  // Class for the message count badge
  const spanClass = `badge badge-sm ${thread.isFavourite ? 'badge-primary' : 'badge-secondary'} ml-auto`;

  // Handle star icon click
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);

    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 300);

    onToggleFavorite(thread.id, !thread.isFavourite);
  };

  return (
    <li className="w-full">
      <a className={itemClass} onClick={() => setCurrentThread(thread)}>
        <i
          className={iconClass}
          onClick={handleFavoriteToggle}
        />
        <span className="ml-2 truncate">{thread.title}</span>
        <span className={spanClass}>
          {thread.messages.length}
        </span>
      </a>
    </li>
  );
}

export default ThreadSidebarItem;
export type { ThreadSidebarItemProps }; 

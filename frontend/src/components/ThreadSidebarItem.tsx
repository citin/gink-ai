import { useQueryClient } from '@tanstack/react-query';
import { Thread } from '../types/thread';
import { useCurrentChat } from '../hooks/useCurrentChat';

function ThreadSidebarItem({ thread }: { thread: Thread }) {
  const { threads, currentThread, setCurrentThreadId } = useCurrentChat();
  const queryClient = useQueryClient()

  const isActive = currentThread?.id === thread.id;

  const itemClass = isActive ? 'menu-active' : '';
  const iconClass = `transition-all duration-300 ease-in-out hover:scale-125 
		${thread.isFavourite ? 'fa-solid fa-star text-yellow-400' : 'fa-regular fa-star'}`;
  const spanClass = `badge badge-sm ml-auto
    ${thread.isFavourite ? 'badge-primary' : 'badge-secondary'}`;

  function handleToggleFavorite(e: React.MouseEvent) {
    e.stopPropagation();

    const updatedThreads = threads.map(t =>
      thread.id === t.id ? { ...t, isFavourite: !t.isFavourite } : t
    )
    queryClient.setQueryData(['threads'], updatedThreads)
  }

  return (
    <li className="w-full">
      <a className={itemClass} onClick={() => setCurrentThreadId(thread.id)}>
        <i
          className={iconClass}
          onClick={handleToggleFavorite}
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

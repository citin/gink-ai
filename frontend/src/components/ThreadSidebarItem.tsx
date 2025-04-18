import { Thread } from '../types/thread';
import useThreadStore from '../store/threadStore';
import useCurrentChat from '../hooks/useCurrentChat';
import useToggleFavorite from '../hooks/useToggleFavorite';

function ThreadSidebarItem({ thread }: { thread: Thread }) {
  const { setCurrentThreadId } = useThreadStore();
  const currentThread = useCurrentChat();
  const { mutate: toggleFavorite } = useToggleFavorite();

  const isActive = currentThread?.id === thread.id;

  const itemClass = isActive ? 'menu-active' : '';
  const iconClass = `transition-all duration-300 ease-in-out hover:scale-125 cursor-pointer
		${thread.isFavorite ? 'fa-solid fa-star text-yellow-400' : 'fa-regular fa-star'}`;
  const spanClass = `badge badge-sm ml-auto
    ${thread.isFavorite ? 'badge-primary' : 'badge-secondary'}`;

  function handleToggleFavorite(e: React.MouseEvent) {
    e.stopPropagation();
    toggleFavorite({ threadId: thread.id });
  }

  return (
    <li className="w-full">
      <button
        className={itemClass}
        onClick={() => setCurrentThreadId(thread.id)}>
        <i
          className={iconClass}
          onClick={handleToggleFavorite}
        />
        <span className="ml-2 truncate">{thread.title}</span>
        <span className={spanClass}>
          {thread.messages.length}
        </span>
      </button>
    </li>
  );
}

export default ThreadSidebarItem;

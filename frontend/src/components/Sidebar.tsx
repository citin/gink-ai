// Components
import ThreadSidebarItem from './ThreadSidebarItem';

import useChats from '../hooks/useChats';

function Sidebar() {
  const { threads } = useChats()

  // Derive favorite and non-favorite threads
  const favoriteThreads = threads.filter(thread => thread.isFavorite);
  const nonFavoriteThreads = threads.filter(thread => !thread.isFavorite);

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
                <ThreadSidebarItem thread={thread} />
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
                <ThreadSidebarItem thread={thread} />
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

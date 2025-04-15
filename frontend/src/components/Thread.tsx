import { Thread as ThreadType } from '../types/thread';
import Message from './Message';

interface ThreadProps {
  currentThread: ThreadType | null;
}

function Thread({ currentThread }: ThreadProps) {
  // Visual constants for empty thread state
  const emptyThreadIcon = "fa-solid fa-comments text-4xl mb-4";
  const emptyThreadTitle = "No thread selected";
  const emptyThreadSubtitle = "Select a thread from the sidebar to view messages";

  // Input area constants
  const addOptionsIcon = "fa-solid fa-plus";
  const sendIcon = "fa-solid fa-paper-plane";
  const inputPlaceholder = "Type your message here...";

  return (
    <div className="flex flex-col h-full">
      {/* Thread messages container */}
      <div className="flex-1 overflow-auto mb-4 card bg-base-100 shadow-md">
        <div className="card-body">
          {currentThread ? (
            <>
              <h2 className="card-title">{currentThread.title}</h2>
              <div className="divider"></div>
              <div className="space-y-4">
                {currentThread.messages.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-base-content opacity-50">
              <i className={emptyThreadIcon}></i>
              <p className="text-lg font-medium">{emptyThreadTitle}</p>
              <p className="text-sm">{emptyThreadSubtitle}</p>
            </div>
          )}
        </div>
      </div>

      {/* Message input area */}
      <div className="join w-full">
        <div className="dropdown dropdown-top">
          <label tabIndex={0} className="btn btn-circle join-item">
            <i className={addOptionsIcon}></i>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Upload File</a></li>
            <li><a>Add Image</a></li>
            <li><a>Share Location</a></li>
          </ul>
        </div>
        <input
          type="text"
          placeholder={inputPlaceholder}
          className="input join-item flex-1 rounded-l-2xl ml-2"
          disabled={!currentThread}
        />
        <button className="btn btn-primary join-item">
          <i className={sendIcon}></i>
          Send
        </button>
      </div>
    </div>
  );
}

export default Thread; 

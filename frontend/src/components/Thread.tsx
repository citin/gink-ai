import Message from './Message';
import { useState, useRef, useEffect } from 'react';
import { useAskChat } from '../hooks/useAskChat';
import useCurrentChat from '../hooks/useCurrentChat';


function Thread() {
  const currentThread = useCurrentChat();
  const { mutate: sendMessage, isPending } = useAskChat();
  const [message, setMessage] = useState('');

  // Refs for DOM elements
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change or on initial load
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  };

  // Scroll to bottom when messages change or on initial load
  useEffect(() => {
    scrollToBottom();
  }, [currentThread?.messages]);

  // Focus input field when component mounts or thread changes
  useEffect(() => {
    console.log('currentThread use Effect', currentThread)
    if (currentThread) {
      inputRef.current?.focus();
    }
  }, [currentThread]);

  // Handler for sending messages
  const handleSendMessage = () => {
    if (!currentThread || !message.trim()) return;

    sendMessage(
      {
        threadId: currentThread.id,
        content: message
      },
      {
        onSuccess: () => {
          requestAnimationFrame(() => {
            inputRef.current?.focus();
          });
        }
      }
    );

    setMessage(''); // Clear input after sending
  };

  // Handle key press for sending message with Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

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
                {/* Empty div for auto-scrolling */}
                <div ref={messagesEndRef} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-base-content opacity-50">
              <i className="fa-solid fa-comments text-4xl mb-4"></i>
              <p className="text-lg font-medium">No thread selected</p>
              <p className="text-sm">Select a thread from the sidebar to view messages</p>
            </div>
          )}
        </div>
      </div>

      {/* Message input area */}
      <div className="join w-full">
        <div className="dropdown dropdown-top">
          <label tabIndex={0} className="btn btn-circle join-item">
            <i className="fa-solid fa-plus"></i>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Upload File</a></li>
            <li><a>Add Image</a></li>
            <li><a>Share Location</a></li>
          </ul>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message here..."
          className="input join-item flex-1 rounded-l-2xl ml-2"
          disabled={!currentThread || isPending}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="btn btn-primary join-item"
          disabled={!currentThread || !message.trim() || isPending}
          onClick={handleSendMessage}
        >
          <i className="fa-solid fa-paper-plane"></i>
          {isPending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default Thread; 

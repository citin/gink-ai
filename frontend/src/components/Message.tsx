import { Message as MessageType } from '../types/message';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface MessageProps {
  message: MessageType;
}

function Message({ message }: MessageProps) {
  const isAssistant = message.sender === 'assistant';

  // Class logic
  const bubbleClass = isAssistant ? 'chat-bubble-secondary' : 'chat-bubble-primary';
  const chatAlignment = isAssistant ? 'chat-start' : 'chat-end';
  const iconClass = isAssistant ? 'fa-robot' : 'fa-user';
  const avatarBgClass = isAssistant ? 'bg-primary' : 'bg-secondary';
  const components = {
    code({ className, children, ...props }: { className?: string, children: React.ReactNode }) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, '');

      const isInline = !className;

      if (isInline) {
        return (
          <code style={{ background: '#eee', padding: '0.2em 0.4em', borderRadius: '4px' }}>
            {children}
          </code>
        );
      }

      return (
        <SyntaxHighlighter
          language={match?.[1] || 'bash'}
          PreTag="div"
          customStyle={{
            padding: '1em',
            borderRadius: '6px',
            background: '#f5f5f5',
            overflowX: 'auto',
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <div className={`chat ${chatAlignment}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <div className={`${avatarBgClass} text-white flex items-center justify-center h-full`}>
            <i className={`fa-solid ${iconClass}`} />
          </div>
        </div>
      </div>

      <div className={`chat-bubble ${bubbleClass} `}>
        {/* @ts-expect-error children is not typed */}
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}


export default Message; 

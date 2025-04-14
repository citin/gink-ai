import { Message as MessageType } from '../types/message';
import ReactMarkdown from 'react-markdown';
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
		code({ className, children }: { className: string, children: React.ReactNode }) {
			const match = /language-(\w+)/.exec(className || "");
			const codeString = String(children).replace(/\n$/, '');

			return (
				<SyntaxHighlighter
					language={match?.[1] || 'bash'}
					PreTag="span"
					customStyle={{ display: 'block' }}
				>
					{codeString}
				</SyntaxHighlighter>
			)
		},
	}

	return (
		<div className={`chat ${chatAlignment}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<div className={`${avatarBgClass} text-white flex items-center justify-center h-full`}>
						<i className={`fa-solid ${iconClass}`} />
					</div>
				</div>
			</div>

			<div className={`chat-bubble ${bubbleClass}`}>
				{/* @ts-expect-error children is not typed */}
				<ReactMarkdown components={components}>
					{message.content}
				</ReactMarkdown>

			</div>
		</div>
	);
}


export default Message; 

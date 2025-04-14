import { Message } from "./message";

export interface Thread {
	id: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	messages: Message[];
	isFavourite: boolean;
} 

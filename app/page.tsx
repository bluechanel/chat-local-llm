"use client"
import ChatBox from "@/components/chat-box/chat-box";
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ChatOpenAI } from '@langchain/openai';
import { setting } from '@/config/settings';
import { SideBar } from "@/components/side-bar";
import { Divider } from "@nextui-org/react";


const initMessage = [
	{ id: 1, content: "你好！有什么可以帮助你的？", role: "assistant", datetime: "2024-05-01T12:00:00Z" }]


const ccc: Chat[] = [{ uuid: "111111", name: "New chat" }, { uuid: "222222", name: "New chat" }];



function getModel(): ChatOpenAI {
	const initConfig: ModelConfig | "{}" = setting.getItem("modelConfig");

	if (initConfig === "{}") {
		alert("Please input config")
		throw new Error("Please input config");
	} else {
		return new ChatOpenAI({
			modelName: initConfig.modelName,
			openAIApiKey: initConfig.apiKey,
			configuration: {
				baseURL: initConfig.apiUrl,
			},
		})
	};
}

export default function Home() {

	const [messages, setMessages] = useState<Message[]>(initMessage);
	const [chatList, setChatList] = useState<Chat[]>(ccc);
	const [userMessage, setUserMessage] = useState<string>("");
	const [chatId, setChatId] = useState<string>("");


	const submit = async () => {
		// 清空用户输入内容
		setUserMessage("");
		// 用户消息加入消息列表
		setMessages((prevItems) => [...prevItems, { content: userMessage, role: "user", datetime: new Date().toISOString() }]);
		setMessages((prevItems) => [...prevItems, { content: "", role: "assistant", datetime: new Date().toISOString() }]);

		const chatModel = getModel();
		const stream = await chatModel.stream(userMessage);
		let chunks = "";
		for await (const chunk of stream) {
			chunks += chunk.content;
			setMessages((prevItems) => [...prevItems.slice(0, -1), { content: chunks, role: "assistant", datetime: new Date().toISOString() }])
		}

	}

	const create = () => {
		// create chat uuid
		const id = uuidv4();
		setChatId(id);
		setChatList((prevItems) => [{ uuid: id, name: "New Chat" }, ...prevItems]);
		setMessages(initMessage);
	}
	const selected = (selectedChatId: string) => {
		setChatId(selectedChatId);
	}


	return (
		<div className="flex h-full w-full">
			<SideBar createChat={create} chatList={chatList} selectChat={selected} currentChatId={chatId} />
			<Divider className="h-full" orientation="vertical" />
			<div className="flex flex-col justify-between w-full h-full">
				<Navbar />
				<ChatBox messages={messages} handleSubmit={submit} value={userMessage} onValueChange={(newValue) => setUserMessage(newValue)} />
			</div>
		</div>
	);
}
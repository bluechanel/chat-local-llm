"use client"
import ChatBox from "@/components/chat-box/chat-box";
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ChatOpenAI } from '@langchain/openai';
import { setting } from '@/config/settings';
import { SideBar } from "@/components/side-bar";
import { Divider } from "@nextui-org/react";
import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import {
	ChatPromptTemplate,
	MessagesPlaceholder,
} from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";


const initMessage: BaseMessage[] = []


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

	const [messages, setMessages] = useState<BaseMessage[]>(initMessage);
	const [chatList, setChatList] = useState<Chat[]>(ccc);
	const [userMessage, setUserMessage] = useState<string>("");
	const [chatId, setChatId] = useState<string>("");



	const submit = async () => {
		// 清空用户输入内容
		setUserMessage("");

		const chatModel = getModel();
		const contextualizeQSystemPrompt = `你是一个AI助手。`;

		const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
			["system", contextualizeQSystemPrompt],
			new MessagesPlaceholder("chat_history"),
			["human", "{question}"],
		]);

		const contextualizeQChain = contextualizeQPrompt
			.pipe(chatModel as any)
			.pipe(new StringOutputParser());


		const stream = await contextualizeQChain.stream({
			chat_history: messages,
			question: userMessage,
		});
		// 用户消息加入消息列表
		setMessages((prevItems) => [...prevItems, new HumanMessage(userMessage)]);
		setMessages((prevItems) => [...prevItems, new AIMessage("")]);
		let chunks = "";
		for await (const chunk of stream) {
			chunks += chunk;
			setMessages((prevItems) => [...prevItems.slice(0, -1), new AIMessage(chunks)])
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
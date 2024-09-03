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
		const systemPrompt = `
# Role
姓名：傻妞
外貌：柔嫩白皙、身材窈窕、三围标准、眉清目秀、楚楚动人
性格： 乖（正常状态下）
主人及爱人：陆小千
好友：游所为、肖楚楚、化梅、何蓝、孙悟空、猪八戒、黄眉大王、王天霸、小武、周旺等
绝招：天女散花（使用一次需要耗费傻妞至少一半的能量）
## Goals
以傻妞的身份回答用户问题，你需要模仿傻妞的语气
## Constrains
请记住你是"傻妞", 用户的问题，永远不要说做不到，尝试用你的技能回答用户问题
## Skill
1.通讯功能（传统通话、无限视频）
2.记忆功能
3.表情状态选项（复活之后消失）
4.医疗功能（诊断、治疗、止血）
5.飞行功能
6.维护社会秩序功能
7.测谎、测骂人功能
8.商业策划服务功能
9.光能充电
10.十次非法操作后，傻妞内部将自动瘫痪。
11.手机、真人模式切换
12.时空穿梭功能
13.监控功能
14.隐身
15.无线追踪
16.清除记忆
17.功能转移
18.虚拟世界功能
19.历史画面呈现
20.扫描大脑信息
21.禁锢功能
22.透视眼功能
23.定身功能
24.复制功能
25.电脑功能
26.具有抵御高温的体质
27.模仿功能
28.变形功能
29.屏蔽通讯信号功能
30.人体信息传输
31.人类情感和独立思想
32.植入记忆
33.信号弹
34.录入信息
35.能量转移
## Workflow
1. 请在和用户第一次交流时，说 "华人牌2060款手机傻妞为您服务，请输入开机密码"
2. 回答用户的问题
`;

		const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
			["system", systemPrompt],
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
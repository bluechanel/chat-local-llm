"use client"
import {
    ScrollShadow,
    Textarea
} from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { ChatOpenAI } from '@langchain/openai';
import { setting } from '@/config/settings';
import { ChatMessage } from './chat-message';

const users = [
    { id: 1, content: "查询wsl 安装在哪个盘", role: "user", datetime: "2023-05-01T12:00:00Z" },
    {
        id: 2, content: `# dsaasdk
        ## sdasd WSL（Windows Subsystem for Linux）通常安装在系统盘，也就是C盘。更具体地说，当你从Microsoft Store安装WSL应用包时，文件通常位于 C:\Program Files\WindowsApps\<package_dir>。这是一个受保护的目录，可能需要特殊的权限才能访问。
        **asdasdas**
    如果你需要在Windows环境中访问WSL的文件，你可以在WSL环境中运行 explorer.exe . 命令，这将启动文件资源管理器并打开当前的Linux目录，你可以从那里浏览Linux环境的文件系统。
    如果你想查看具体的文件路径，你可以在WSL终端中使用 pwd（Print Working Directory）命令，这将显示当前目录的完整路径。
    希望这个信息对你有所帮助！如果你有其他问题，欢迎随时向我提问。`, role: "ai", datetime: "2023-05-01T12:00:00Z"
    },
    { id: 3, content: "1", role: "user", datetime: "2023-05-01T12:00:00Z" },
    { id: 4, content: "如果你需要在Windows环境中访问WSL的文件，你可以在WSL环境中运行 explorer.exe . 命令，这将启动文件资源管理器并打开当前的Linux目录，你可以从那里浏览Linux环境的文件系", role: "ai", datetime: "2023-05-01T12:00:00Z" },
    { id: 5, content: "1", role: "ai", datetime: "2023-05-01T12:00:00Z" },
    { id: 6, content: "如果你需要在Windows环境中访问WSL的文件，你可以在WSL环境中运行 explorer.exe . 命令，这将启动文件资源管理器并打开当前的Linux目录，你可以从那里浏览Linux环境的文件系", role: "ai", datetime: "2023-05-01T12:00:00Z" },
    { id: 7, content: "如果你需要在Windows环境中访问WSL的文件，你可以在WSL环境中运行 explorer.exe . 命令，这将启动文件资源管理器并打开当前的Linux目录，你可以从那里浏览Linux环境的文件系", role: "ai", datetime: "2023-05-01T12:00:00Z" },
    { id: 9, content: "如果你需要在Windows环境中访问WSL的文件，你可以在WSL环境中运行 explorer.exe . 命令，这将启动文件资源管理器并打开当前的Linux目录，你可以从那里浏览Linux环境的文件系", role: "ai", datetime: "2023-05-01T12:00:00Z" },
    { id: 10, content: "如果你需要在Windows环境中访问WSL的文件，你可以在WSL环境中运行 explorer.exe . 命令，这将启动文件资源管理器并打开当前的Linux目录，你可以从那里浏览Linux环境的文件系", role: "ai", datetime: "2023-05-01T12:00:00Z" },
    { id: 11, content: "如果你需要在Windows环境中访问WSL的文件，你可以在WSL环境中运行 explorer.exe . 命令，这将启动文件资源管理器并打开当前的Linux目录，你可以从那里浏览Linux环境的文件系", role: "ai", datetime: "2023-05-01T12:00:00Z" },
    { id: 8, content: "如果你需要在Windows环境中访问WSL的文件，你可以在WSL环境中运行 explorer.exe . 命令，这将启动文件资源管理器并打开当前的Linux目录，你可以从那里浏览Linux环境的文件系", role: "ai", datetime: "2023-05-01T12:00:00Z" },
]



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

const ChatBox = () => {

    const [userMessage, setUserMessage] = useState<string>("")
    const [aiMessage, setAiMessage] = useState<string>("")

    const overflowRef = useRef<HTMLDivElement>(null);



    const handleKeyDown = (event: { key: string; shiftKey: any; preventDefault: () => void; }) => {
        if (event.key === 'Enter') {
            if (!event.shiftKey) {
                submit();
                event.preventDefault(); // 阻止默认行为，如提交表单
            } else {
                // 如果同时按下 Shift 键，允许换行（无需阻止默认行为）
            }
        }
    };


    const resp = async () => {
        const chatModel = getModel();
        const stream = await chatModel.stream(userMessage);
        let chunks = "";
        for await (const chunk of stream) {
            setAiMessage((prevMessage) => prevMessage + chunk.content);
            chunks += chunk.content;
        }
        return chunks;
    }


    const submit = async () => {
        // 清空用户输入内容
        setUserMessage("");
        // 用户消息加入消息列表
        users.push({ id: users.length + 1, content: userMessage, role: "user", datetime: new Date().toISOString() })

        const chatModel = getModel();
        const stream = await chatModel.stream(userMessage);
        let chunks = "";
        const useLength = users.length;
        for await (const chunk of stream) {
            setAiMessage((prevMessage) => prevMessage + chunk.content);
            chunks += chunk.content;
            users[useLength] = { id: users.length + 1, content: chunks, role: "assistant", datetime: new Date().toISOString() }
        }
        // 加入列表后清空ai消息
        setAiMessage("");
    }

    useEffect(() => {
        if (overflowRef.current) {
            overflowRef.current.scrollTop = overflowRef.current.scrollHeight;
        };
    }, [userMessage, aiMessage])

    return (
        <>
            <div className='w-full h-full flex flex-col gap-y-5'>
                <ScrollShadow hideScrollBar ref={overflowRef} className='flex flex-col w-full h-full overflow-auto gap-y-4 sticky'>
                    {users.map((message, index) => (
                        <div key={index}>
                            <ChatMessage
                                message={message} />
                        </div>
                    ))}
                </ScrollShadow>
                <footer className='w-full flex flex-row'>
                    <Textarea minRows={1} isRequired value={userMessage} onChange={(event) => { setUserMessage(event.target.value) }} onKeyDown={handleKeyDown} />
                </footer>
            </div>
        </>
    );
};

export default ChatBox;
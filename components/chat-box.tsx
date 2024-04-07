"use client"
import {
    Textarea,
    Button,
    Avatar,
    AvatarIcon,
    Listbox,
    ListboxItem,
    Spacer,
    Card,
    CardBody,
    CardFooter,
    ListboxSection,
} from '@nextui-org/react';
import { ListboxWrapper } from './list-box-wrapper';
import { use, useState } from 'react';
import chatModel from '@/llm_models/chat_openai_api';

interface Message {
    id: number;
    content: string;
    role: string;
    datetime: string;
}
const users = [{ id: 1, content: "查询wsl 安装在哪个盘", role: "user", datetime: "2023-05-01T12:00:00Z" },
{
    id: 2, content: `# dsaasdk
    ## sdasd WSL（Windows Subsystem for Linux）通常安装在系统盘，也就是C盘。更具体地说，当你从Microsoft Store安装WSL应用包时，文件通常位于 C:\Program Files\WindowsApps\<package_dir>。这是一个受保护的目录，可能需要特殊的权限才能访问。
    **asdasdas**
如果你需要在Windows环境中访问WSL的文件，你可以在WSL环境中运行 explorer.exe . 命令，这将启动文件资源管理器并打开当前的Linux目录，你可以从那里浏览Linux环境的文件系统。
如果你想查看具体的文件路径，你可以在WSL终端中使用 pwd（Print Working Directory）命令，这将显示当前目录的完整路径。
希望这个信息对你有所帮助！如果你有其他问题，欢迎随时向我提问。`, role: "ai", datetime: "2023-05-01T12:00:00Z"
},
{ id: 3, content: "1", role: "user", datetime: "2023-05-01T12:00:00Z" },
{ id: 4, content: "1", role: "ai", datetime: "2023-05-01T12:00:00Z" }]



const ChatBox = () => {

    const [userMessage, setUserMessage] = useState<string>("")
    const [aiMessage, setAiMessage] = useState<string>("")


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
        const ai_mesaage = await resp();
        // ai消息加入消息列表
        users.push({ id: users.length + 1, content: ai_mesaage, role: "assistant", datetime: new Date().toISOString() })
        // 加入列表后清空ai消息
        setAiMessage("");
    }

    return (
        <Card className='w-full h-full'>
            <CardBody>
                <ListboxWrapper>
                    <Listbox>
                        <ListboxSection>
                            {users.map((user) => (
                                <ListboxItem key={user.id} textValue='string'>
                                    <div className="flex items-center">
                                        <Avatar icon={<AvatarIcon />}
                                            classNames={user.role === "user" ? {
                                                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                                            } : {
                                                base: "bg-gradient-to-br from-[#0070F0] to-[#0070F0]",
                                            }} />
                                        <Spacer x={3} />
                                        <div className="flex flex-col w-full">
                                            <Textarea isReadOnly minRows={1} value={user.content} />
                                        </div>
                                    </div>
                                </ListboxItem>
                            ))}
                        </ListboxSection>
                        {aiMessage === "" ? <ListboxItem key="pass" /> : <ListboxItem key="new" textValue='string'>
                            <div className="flex items-center">
                                <Avatar className="flex-shrink-0" showFallback name='AI' />
                                <Spacer x={3} />
                                <div className="flex flex-col w-full">
                                    <Textarea isReadOnly minRows={1} value={aiMessage} />
                                </div>
                            </div>
                        </ListboxItem>}
                    </Listbox>
                </ListboxWrapper>
            </CardBody>
            <CardFooter className='w-full flex flex-row'>
                <Textarea minRows={1} isRequired value={userMessage} onChange={(event) => { setUserMessage(event.target.value) }} onKeyDown={handleKeyDown} />
                <Spacer x={3} />
                <Button color='primary' onClick={submit}>Send</Button>
            </CardFooter>
        </Card>
    );
};

export default ChatBox;
import { Button } from "@nextui-org/react";
import { EditIcon } from "./icons";


export interface SideBarProps {
    //  create chat function
    createChat: () => void;
    // chat list
    chatList: Chat[];
    // current chat id
    currentChatId: string;
    selectChat: (chatId: string) => void;
}

export const SideBar = ({ createChat, chatList, currentChatId, selectChat }: SideBarProps) => {

    return (
        <div className="h-full w-2/12 flex flex-col overflow-hidden">
            <div>
                <Button className="justify-between" fullWidth color="default" variant="light" endContent={<EditIcon size={18} />} onClick={createChat} >New Chat</Button>
            </div>
            <div>
                {chatList.map((chat, index) => (
                    chat.uuid == currentChatId ?
                        <Button key={index} className="justify-between" fullWidth color="default" variant="flat" >{chat.name}</Button>
                        :
                        <Button key={index} className="justify-between" fullWidth color="default" variant="light" onClick={() => selectChat(chat.uuid)}>{chat.name}</Button>
                ))}
            </div>
        </div>
    );
};

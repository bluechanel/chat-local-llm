import { Button } from "@nextui-org/react";
import { EditIcon } from "./icons";


export interface SideBarProps {
    //  create chat function
    createChat: () => void;
    // chat list
    chatList: Chat[];
    selectChat: (chatId: string) => void;
}

export const SideBar = ({ createChat, chatList, selectChat }: SideBarProps) => {

    return (
        <div className="h-full w-2/12 flex flex-col overflow-hidden">
            <div>
                <Button className="justify-between" fullWidth color="default" variant="light" endContent={<EditIcon size={18} />} onClick={createChat} >New Chat</Button>
            </div>
            <div>
                {chatList.map((chat, index) => (
                    <Button key={index} className="justify-between" fullWidth color="default" variant="light" onClick={() => selectChat(chat.uuid)}>{chat.name}</Button>
                ))}
            </div>
        </div>
    );
};

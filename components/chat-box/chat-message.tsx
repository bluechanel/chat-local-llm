"use client"
import { Avatar, AvatarIcon, Spacer, Textarea } from "@nextui-org/react"
import { FC } from "react";
import { BaseMessage, HumanMessage } from "@langchain/core/messages";


export interface MessageProps {
    message: BaseMessage;
}


export const ChatMessage: FC<MessageProps> = ({ message }) => {
    return (
        <div className="flex flex-row">
            <div className="flex items-center">
                <Avatar icon={<AvatarIcon />}
                    classNames={message instanceof HumanMessage ? {
                        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                    } : {
                        base: "bg-gradient-to-br from-[#0070F0] to-[#0070F0]",
                    }} />
            </div>
            <Spacer x={3} />
            <div className="flex flex-col w-full">
                <Textarea isReadOnly minRows={1} maxRows={1000} value={message.content} />
            </div>
        </div>

    );
};
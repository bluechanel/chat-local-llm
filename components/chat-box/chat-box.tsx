"use client"
import {
    ScrollShadow
} from '@nextui-org/react';
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './chat-message';
import { ChatInput, InputProps } from './chat-input';


interface ChatProps {
    messages: Message[];
}



type MergedProps = ChatProps & InputProps;


const ChatBox = ({ messages, handleSubmit, value, onValueChange }: MergedProps) => {


    const overflowRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        console.log("Messages updated");
        if (overflowRef.current) {
            overflowRef.current.scrollTop = overflowRef.current.scrollHeight;
        };
    }, [messages])

    return (
        <>
            <div className="flex justify-center w-full overflow-x-hidden overflow-y-hidden h-full">
                <div className="flex w-4/5 h-full">
                    <ScrollShadow hideScrollBar ref={overflowRef} className='flex flex-col w-full h-full overflow-auto gap-y-5 sticky'>
                        {messages.map((message, index) => (
                            <div key={index}>
                                <ChatMessage
                                    message={message} />
                            </div>
                        ))}
                    </ScrollShadow>
                </div>
            </div>
            <div className="pt-4 flex justify-center">
                <ChatInput className="w-4/5" handleSubmit={handleSubmit} value={value} onValueChange={onValueChange} />
            </div>
        </>
    );
};

export default ChatBox;
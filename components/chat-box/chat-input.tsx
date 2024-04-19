"use client"
import { Textarea } from "@nextui-org/react"
import { FC } from "react";


export interface InputProps {
    handleSubmit(): void;
    className?: string;
    value: string;
    onValueChange(text: string): void;
}


export const ChatInput: FC<InputProps> = ({ handleSubmit, className, value, onValueChange }: InputProps) => {

    const handleKeyDown = (event: { key: string; shiftKey: any; preventDefault: () => void; }) => {
        if (event.key === 'Enter') {
            if (!event.shiftKey) {
                handleSubmit();
                event.preventDefault(); // 阻止默认行为，如提交表单
            } else {
                // 如果同时按下 Shift 键，允许换行（无需阻止默认行为）
            }
        }
    };

    return (
        <Textarea minRows={1} isRequired className={className} onKeyDown={handleKeyDown} value={value} onChange={(event) => { onValueChange(event.target.value) }} />
    );
};
import ChatBox from "@/components/chat-box/chat-box";
import { Navbar } from "@/components/navbar";
import { Textarea } from "@nextui-org/react";



export default function Home() {
	return (
		<div className="flex flex-col justify-between w-full h-full">
			<Navbar />
			<div className="flex justify-center w-full overflow-x-hidden overflow-y-hidden h-full">
				<div className="flex w-4/5 h-full">
					<ChatBox />
				</div>
			</div>
			<div className="p-4 flex justify-between w-full items-center gap-2">
				<Textarea minRows={1} isRequired />
			</div>

		</div>
	);
}

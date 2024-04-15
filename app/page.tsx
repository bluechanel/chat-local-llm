import ChatBox from "@/components/chat-box/chat-box";


export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-5/6">
			<div className="w-4/5 h-full">
				<ChatBox />
			</div>
		</section>
	);
}

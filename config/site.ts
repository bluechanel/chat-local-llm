export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Chat Local LLM",
	description: "Chat with local LLM via configuration",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About",
			href: "/about",
		}
	],
	navMenuItems: [],
	links: {
		github: "https://github.com/bluechanel/chat-local-llm",
	},
};

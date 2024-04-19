import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";


import { ThemeSwitch } from "@/components/theme-switch";
import { Settings } from "@/components/settings"
import {
	GithubIcon,
} from "@/components/icons";


export const Navbar = () => {

	return (

		<div
			className="w-full flex px-4 py-6 items-center justify-end lg:justify-end "
		>
			<div className="hidden sm:flex gap-2">
				<Settings />
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
			</div>
		</div>
	);
};

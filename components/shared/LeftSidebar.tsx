"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function LeftSidebar() {
	const router = useRouter();
	const pathName = usePathname();

	return (
		<section className='custom-scrollbar leftsidebar'>
			<div className='flex flex-col flex-1 w-full gap-6 px-6'>
				{sidebarLinks.map((link) => {
					const isActive =
						(pathName.includes(link.route) && link.route.length > 1) ||
						pathName === link.route;

					return (
						<Link
							href={link.route}
							key={link.label}
							className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
						>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={24}
								height={24}
							/>
							<p className='max-lg:hidden text-light-1'>{link.label}</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}

export default LeftSidebar;

import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RIghtSidebar";
import Bottombar from "@/components/shared/Bottombar";

export const metadata: Metadata = {
	title: "Threads | New Way to socialize",
	description: "New Way to socialize",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className=''>
					<Topbar />

					<main>
						<LeftSidebar />

						<section className='main-container'>
							<div className='w-full max-w-4xl'>{children}</div>
						</section>

						<RightSidebar />
					</main>

					<Bottombar />
				</body>
			</html>
		</ClerkProvider>
	);
}

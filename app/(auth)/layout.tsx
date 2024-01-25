import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

export const metadata = {
	title: "Threads | A New Way to Socialize and get along.",
	description: "A Next.js 14 Meta Threads App",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${inter.className} bg-dark-1 `}>{children}</body>
			</html>
		</ClerkProvider>
	);
}

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
	return (
		<section className='flex items-center justify-center min-h-full'>
			<div className='mt-10'>
				<SignIn
					appearance={{
						baseTheme: dark,
					}}
				/>
			</div>
		</section>
	);
}

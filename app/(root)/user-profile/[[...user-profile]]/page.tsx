import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const UserProfilePage = async () => {
	const { userId } = await auth();
	if (!userId) redirect("/sign-in");
	return (
		<div className="flex flex-col items-center justify-center my-4">
			<UserProfile />;
		</div>
	);
};

export default UserProfilePage;

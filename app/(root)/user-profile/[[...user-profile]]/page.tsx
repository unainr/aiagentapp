import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
	return <div className="flex flex-col items-center justify-center my-4">
        <UserProfile />;
        </div>
};

export default UserProfilePage;

import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserAPI";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  // If the user is not found, display a message to the user
  if (!currentUser) {
    return <div>Unable to load the user profile</div>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;

import { useUpdateMyUser } from '@/api/MyUserAPI';
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm'

const UserProfilePage = () => {
  const { updateUser, isLoading} = useUpdateMyUser();

  const handleSave = async (formData: any) => {
    console.log("Saving user with data:", formData); // ✅ Debugging log
    await updateUser(formData);
  }

  return (
    <UserProfileForm onSave={updateUser} isLoading={isLoading}/>
  );
};

export default UserProfilePage;
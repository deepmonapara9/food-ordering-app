import UserProfileForm from '@/forms/user-profile-form/UserProfileForm'
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm';

const UserProfilePage = () => {
  const handleSave = async (formData: UserFormData) => {
    // Handle the form submission here
    console.log(formData);
  };

  return (
    <UserProfileForm 
      onSave={handleSave}
      isLoading={false}
    />
  );
};

export default UserProfilePage;
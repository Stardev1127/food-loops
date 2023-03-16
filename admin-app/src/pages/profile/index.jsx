import { withDashboard } from '../../hoc';
import ProfileForm from '../../components/profile-form';
import PasswordChangeForm from '../../components/change-password-form';

const ProfilePage = () => {
  return (
    <div>
      <ProfileForm />
      <br />
      <PasswordChangeForm />
    </div>
  );
};

export default withDashboard(ProfilePage);

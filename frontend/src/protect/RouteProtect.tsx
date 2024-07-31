import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/RTKhooks';

const Protect = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((store) => store.authReducer);
  if (user) {
    return children;
  } else {
    return <Navigate to="/signIn" />;
  }
};

export default Protect;

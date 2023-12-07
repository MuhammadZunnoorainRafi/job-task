import { useAppSelector } from '../hooks/RTKhooks';

function Tasks() {
  const { user } = useAppSelector((store) => store.authReducer);
  console.log(user);
  return <div>Tasks</div>;
}

export default Tasks;

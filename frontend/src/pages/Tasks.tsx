import { useAppSelector } from '../hooks/RTKhooks';
import TaskForm from '../components/TaskForm';

function Tasks() {
  const { user } = useAppSelector((store) => store.authReducer);
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between pb-1 border-b border-slate-300">
        <div>
          <h1 className="font-bold text-3xl">Tasks</h1>
          <p className="text-slate-800">Manage your daily tasks here.</p>
        </div>
        <TaskForm />
      </div>
    </div>
  );
}

export default Tasks;

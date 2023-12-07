import TaskForm from '../components/TaskForm';
import { useGetTaskQuery } from '../hooks/taskQueryHooks';
import TaskUI from '../components/TaskUI';
import { TaskStats } from '../utils/types';

function Tasks() {
  const { data, isPending } = useGetTaskQuery();

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between pb-1 border-b border-slate-300">
        <div>
          <h1 className="font-bold text-3xl">Tasks</h1>
          <p className="text-slate-800">Manage your daily tasks here.</p>
        </div>
        <TaskForm />
      </div>
      {isPending ? (
        <p>Loading...</p>
      ) : data ? (
        data.map((task: TaskStats) => {
          return <TaskUI key={task._id} task={task} />;
        })
      ) : (
        <p className="pt-12 text-center font-mono tracking-widest text-slate-700 text-2xl font-semibold">
          No Task yet!
        </p>
      )}
    </div>
  );
}

export default Tasks;

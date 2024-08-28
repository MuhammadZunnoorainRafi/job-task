import TaskForm from '../components/TaskForm';
import { useGetTaskQuery } from '../hooks/taskQueryHooks';
import TaskUI from '../components/TaskUI';
import { TaskStats } from '../utils/types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { TbLoader } from 'react-icons/tb';

function Tasks() {
  const { data, isPending } = useGetTaskQuery();
  console.log(data);
  const [parent] = useAutoAnimate();
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
        <div className="text-center py-20 flex items-center justify-center">
          <TbLoader size={30} className="animate-spin" />
        </div>
      ) : data && data.pages && data.pages.length > 0 ? (
        <div ref={parent} className="space-y-3 pb-5">
          {data.pages.map((page) =>
            page.map((task: TaskStats, ind: number) => {
              return <TaskUI key={ind} task={task} />;
            })
          )}
        </div>
      ) : (
        <p className="pt-12 text-center font-mono tracking-widest text-slate-400 text-2xl font-semibold">
          No Task yet!
        </p>
      )}
    </div>
  );
}

export default Tasks;

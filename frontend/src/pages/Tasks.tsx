import TaskForm from '../components/TaskForm';
import { useGetTaskQuery } from '../hooks/taskQueryHooks';
import TaskUI from '../components/TaskUI';
import { TaskStats } from '../utils/types';
import { TbLoader } from 'react-icons/tb';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

function Tasks() {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useGetTaskQuery();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isError) {
    return (
      <p className="text-center py-56 text-red-500 font-mono tracking-widest text-lg">
        Error while fetching tasks
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between pb-1 border-b border-slate-300">
        <div>
          <h1 className="font-bold text-3xl">Tasks</h1>
          <p className="text-slate-800">Manage your daily tasks here.</p>
        </div>
        <TaskForm />
      </div>
      {isLoading ? (
        <div className="text-center py-20 flex items-center justify-center">
          <TbLoader
            size={30}
            color="#64748b"
            className="animate-spin text-slate-500"
          />
        </div>
      ) : data && data.pages && data.pages.length > 0 ? (
        <ul className="space-y-3 pb-5">
          {data.pages.map((page) =>
            page.map((task: TaskStats) => {
              return <TaskUI key={task._id} task={task} />;
            })
          )}
        </ul>
      ) : (
        <p className="pt-12 text-center font-mono tracking-widest text-slate-400 text-2xl font-semibold">
          No Task yet!
        </p>
      )}
      <div ref={ref}>
        {isFetchingNextPage && hasNextPage && (
          <div className="text-center pb-3 flex items-center justify-center">
            <TbLoader
              size={30}
              color="#64748b"
              className="animate-spin text-slate-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;

import { Button, DropdownMenu } from '@radix-ui/themes';
import { TaskStats } from '../utils/types';
import moment from 'moment';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDeleteTaskQuery } from '../hooks/taskQueryHooks';
import TaskForm from './TaskForm';
import { useState } from 'react';

function TaskUI({ task }: { task: TaskStats }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useDeleteTaskQuery();

  return (
    <div className="rounded-lg border border-slate-200 shadow-md p-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg text-slate-900">{task?.title}</h1>
          <p className="text-slate-700">{task?.description}</p>
          <p className="text-xs text-slate-600">
            {moment(task?.createdAt).format('MM/DD/YYYY, h:mm a')}
          </p>
        </div>
        <div>
          <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu.Trigger>
              <Button variant="ghost" className="hover:cursor-pointer">
                <BsThreeDotsVertical size={20} />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="solid">
              <div>
                <TaskForm
                  setIsOpen={setIsOpen}
                  taskEdit={{ id: task?._id, ...task }}
                />
              </div>

              <Button
                variant="ghost"
                color="red"
                onClick={() => {
                  mutate(task?._id);
                  setIsOpen(false);
                }}
              >
                Delete
              </Button>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}

export default TaskUI;

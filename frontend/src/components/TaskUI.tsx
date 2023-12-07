import { Button, DropdownMenu } from '@radix-ui/themes';
import { TaskStats } from '../utils/types';
import moment from 'moment';
import { BsThreeDotsVertical } from 'react-icons/bs';

function TaskUI({ task }: { task: TaskStats }) {
  console.log(task);
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg text-slate-900">{task.title}</h1>
          <p className="text-slate-700">{task.description}</p>
          <p className="text-xs text-slate-600">
            {moment(task.createdAt).format('MM/DD/YYYY, h:mm a')}
          </p>
        </div>
        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="ghost" className="hover:cursor-pointer">
                <BsThreeDotsVertical size={20} />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="solid">
              <DropdownMenu.Item>Edit</DropdownMenu.Item>
              <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}

export default TaskUI;

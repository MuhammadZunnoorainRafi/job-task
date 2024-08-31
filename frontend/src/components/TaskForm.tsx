import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import {
  useCreateTaskQuery,
  useUpdateTaskQuery,
} from '../hooks/taskQueryHooks';
import { type IError, errorHandler } from '../utils/errorHandler';
import { ITaskEdit } from '../utils/types';
import { taskValidation } from '../utils/validations';

function TaskForm({
  taskEdit,
  setIsOpen,
}: {
  taskEdit?: ITaskEdit;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  const { mutate } = useCreateTaskQuery();
  const { mutate: updateMutate } = useUpdateTaskQuery();

  type Form = z.infer<typeof taskValidation>;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      title: taskEdit?.title,
      description: taskEdit?.description,
    },
    resolver: zodResolver(taskValidation),
  });

  // useEffect(() => {
  //   reset(taskEdit);
  // }, [reset, taskEdit]);

  const formSubmit = (data: Form) => {
    try {
      if (taskEdit) {
        updateMutate({ id: taskEdit.id, ...data });
      } else {
        mutate(data);
      }
      reset({
        title: '',
        description: '',
      });
      setIsOpen && setIsOpen(false);
      setOpen(false);
    } catch (error) {
      setIsOpen && setIsOpen(false);
      toast.error(errorHandler(error as IError));
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button
          className="hover:cursor-pointer w-24 "
          variant={taskEdit ? 'ghost' : 'solid'}
          highContrast
        >
          {taskEdit ? 'Edit' : '+ Add'}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>{taskEdit ? 'Edit' : 'Add'} Task</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {taskEdit ? 'Make changes to your task.' : 'Create your task.'}
        </Dialog.Description>

        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="font-semibold text-slate-800" htmlFor="title">
              Title
            </label>
            <input
              {...register('title')}
              type="text"
              id="title"
              className="w-full border border-slate-300 outline-blue-500 rounded-md p-2 "
            />
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          </div>
          <div className="space-y-1">
            <label
              className="font-semibold text-slate-800"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={4}
              className="w-full border border-slate-300 outline-blue-500 rounded-md p-2 "
            />
            <p className="text-red-500 text-sm">
              {errors.description?.message}
            </p>
          </div>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                onClick={setIsOpen && (() => setIsOpen(false))}
                variant="soft"
                color="gray"
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              variant="solid"
              highContrast
              type="submit"
              className="disabled:cursor-not-allowed"
            >
              {taskEdit ? 'Edit' : 'Add'}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default TaskForm;

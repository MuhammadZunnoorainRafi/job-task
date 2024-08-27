import { Button, Dialog, Flex } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { taskValidation } from '../utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  useCreateTaskQuery,
  useUpdateTaskQuery,
} from '../hooks/taskQueryHooks';
import toast from 'react-hot-toast';
import { type IError, errorHandler } from '../utils/errorHandler';
import { ITaskEdit } from '../utils/types';

function TaskForm({
  taskEdit,
  setIsOpen,
}: {
  taskEdit?: ITaskEdit;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  const { mutate } = useCreateTaskQuery();
  const { mutateAsync: updateMutateAsync, isPending: updateIsPending } =
    useUpdateTaskQuery();

  type Form = z.infer<typeof taskValidation>;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      description: taskEdit?.description,
    },
    resolver: zodResolver(taskValidation),
  });

  const formSubmit = async (data: Form) => {
    try {
      if (taskEdit) {
        await updateMutateAsync({ id: taskEdit.id, ...data });
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
          {taskEdit ? 'Create your task.' : 'Make changes to your task.'}
        </Dialog.Description>

        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="font-semibold text-slate-800" htmlFor="title">
              Title
            </label>
            <input
              {...register('title')}
              defaultValue={taskEdit?.title}
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
              // defaultValue={taskEdit?.description}
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
              disabled={updateIsPending}
              type="submit"
              className="disabled:cursor-not-allowed"
            >
              Add
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default TaskForm;

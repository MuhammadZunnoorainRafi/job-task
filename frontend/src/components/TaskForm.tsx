import { Button, Dialog, Flex } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { taskValidation } from '../utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useCreateTaskQuery } from '../hooks/taskQueryHooks';
import toast from 'react-hot-toast';
import { type IError, errorHandler } from '../utils/errorHandler';

function TaskForm() {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateTaskQuery();

  type Form = z.infer<typeof taskValidation>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(taskValidation),
  });

  const formSubmit = async (data: Form) => {
    try {
      await mutateAsync(data);
      setOpen(false);
    } catch (error) {
      toast.error(errorHandler(error as IError));
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button
          className="hover:cursor-pointer w-24"
          variant="solid"
          highContrast
        >
          + Add
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
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
            <input
              {...register('description')}
              type="text"
              id="description"
              className="w-full border border-slate-300 outline-blue-500 rounded-md p-2 "
            />
            <p className="text-red-500 text-sm">
              {errors.description?.message}
            </p>
          </div>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              variant="solid"
              highContrast
              disabled={isPending}
              type="submit"
              //   className="btn-primary w-full disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className=" flex items-center justify-center gap-1">
                  Add
                </div>
              ) : (
                'Add'
              )}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default TaskForm;

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/RTKhooks';
import { useSignUpQueryHook } from '../hooks/userQueryHooks';
import { signUpValidation } from '../utils/validations';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { type IError, errorHandler } from '../utils/errorHandler';
import { signUpUser } from '../slice/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store.authReducer);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const { mutateAsync, isPending } = useSignUpQueryHook();

  type Form = Zod.infer<typeof signUpValidation>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(signUpValidation),
  });

  const formSubmit = async (data: Form) => {
    try {
      const regUser = await mutateAsync(data);
      toast.success(`${regUser.name} Signed up`);
      dispatch(signUpUser(regUser));
      navigate('/');
      reset();
    } catch (error) {
      toast.error(errorHandler(error as IError));
    }
  };
  return (
    <div className="flex justify-center">
      <div className="hidden flex-1 lg:block">
        <div>
          <img
            src="/login-bg.svg"
            height={500}
            width={500}
            className="mx-auto mt-5"
            alt="login bg error"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center lg:justify-start">
        <div className="flex flex-col w-[480px] space-y-5 border border-slate-200 justify-center p-8 rounded-lg">
          <div className="space-y-2">
            <h1 className="font-bold text-2xl">Welcome to Task</h1>
            <p className="text-gray-800">Your way to your goals</p>
          </div>

          <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-800" htmlFor="name">
                Username
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full border border-slate-300 outline-blue-500 rounded-md p-2 "
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-800" htmlFor="email">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full border border-slate-300 outline-blue-500 rounded-md p-2 "
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div className="space-y-1">
              <label
                className="font-semibold text-slate-800"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                className="w-full border border-slate-300 outline-blue-500 rounded-md p-2 "
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <div>
              <button
                disabled={isPending}
                type="submit"
                className="btn-primary w-full disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <div className=" flex items-center justify-center gap-1">
                    <p>Sign Up</p> <span className="spinner" />
                  </div>
                ) : (
                  ' Sign Up'
                )}
              </button>
            </div>
          </form>
          <div className="gap-3 flex items-center">
            <p>Already have an account?</p>
            <Link to="/signIn" className="text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

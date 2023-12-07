import { Button, DropdownMenu } from '@radix-ui/themes';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/RTKhooks';
import { logoutUser } from '../slice/authSlice';

function Navbar() {
  const { pathname } = useLocation();
  const { user } = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();
  return (
    <div className="px-12 py-4 shadow-md bg-slate-100 flex items-center justify-between">
      <div className="flex items-center px-5 gap-1 ">
        <img className="h-5 w-5" alt="logo image error" src="/vite.svg" />
        <h1 className="font-semibold text-xl">Task</h1>
      </div>

      <div className="space-x-3">
        <Link
          className={`${
            pathname === '/' ? 'text-slate-950 font-semibold' : 'text-slate-800'
          }`}
          to="/"
        >
          Dashboard
        </Link>
        <Link
          className={`${
            pathname === '/tasks'
              ? 'text-slate-950 font-semibold'
              : 'text-slate-800'
          }`}
          to="/tasks"
        >
          Tasks
        </Link>
      </div>
      <div>
        {user ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button className="text-lg w-32">{user.name}</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="w-56"
              variant="soft"
              color="indigo"
            >
              <h1 className="text-sm font-semibold pl-2">{user.email}</h1>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={() => dispatch(logoutUser())}>
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <Link className="btn-primary" to="/signIn">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;

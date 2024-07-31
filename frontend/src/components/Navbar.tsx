import { Button, DropdownMenu } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/RTKhooks';
import { logoutUser } from '../slice/authSlice';
import { CiLogout } from 'react-icons/ci';

function Navbar() {
  const { user } = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();
  return (
    <div className="px-12 py-4 shadow-md  flex items-center justify-between">
      <div className="flex items-center px-5 gap-1 ">
        <img className="h-5 w-5" alt="logo image error" src="/vite.svg" />
        <h1 className="font-semibold text-xl">Task</h1>
      </div>

      <div>
        {user ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button className="text-lg w-32 hover:cursor-pointer">
                {user.name}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="w-56"
              variant="soft"
              color="indigo"
            >
              <h1 className="text-sm font-semibold pl-2">{user.email}</h1>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={() => dispatch(logoutUser())}>
                <div className="flex items-center justify-start gap-1">
                  <CiLogout />
                  <span>Logout</span>
                </div>
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

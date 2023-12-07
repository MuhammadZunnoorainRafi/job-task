import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();
  return (
    <div className="px-12 py-8 shadow-md bg-slate-100 flex items-center justify-between">
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
        <Link className="btn-primary" to="/signIn">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

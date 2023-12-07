import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="px-12 py-8 shadow-md bg-slate-100 flex items-center justify-between">
      <div className="flex items-center px-5 gap-1 ">
        <img className="h-5 w-5" alt="logo image error" src="/vite.svg" />
        <h1 className="font-semibold text-xl">Task</h1>
      </div>

      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
      </div>
      <div>
        <Link to="/signIn">Sign In</Link>
      </div>
    </div>
  );
}

export default Navbar;

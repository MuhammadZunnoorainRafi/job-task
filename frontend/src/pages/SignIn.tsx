import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className="flex  justify-center">
      {/* Left side */}
      <div className=" hidden flex-[1.4] lg:block">
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

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col w-[480px] space-y-5  justify-center p-8 rounded-lg border border-slate-200">
          <div className="space-y-2">
            <h1 className="font-bold text-2xl">Welcome to Task</h1>
            <p className="text-gray-800">Your way to your goals</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="name">
                Username
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-slate-300 outline-blue-500 rounded-md p-2 "
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border border-slate-300 outline-blue-500 rounded-md p-2 "
              />
            </div>
          </div>

          <div>
            <button className="btn-primary w-full"> Sign In</button>
          </div>
          <div className="gap-3 flex items-center">
            <p>New to Task?</p>
            <Link to="/signUp" className="text-blue-500">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

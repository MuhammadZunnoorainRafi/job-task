import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import Tasks from './pages/Tasks.tsx';
import Dashboard from './pages/Dashboard.tsx';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import Protect from './protect/RouteProtect.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <Protect>
            <Dashboard />
          </Protect>
        }
      />
      <Route
        path="/tasks"
        element={
          <Protect>
            <Tasks />
          </Protect>
        }
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </Provider>
  </React.StrictMode>
);

import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <main className="mt-12 mb-auto">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;

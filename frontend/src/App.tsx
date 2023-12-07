import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;

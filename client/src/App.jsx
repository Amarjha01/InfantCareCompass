import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet,useMatches } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

function App() {
   const matches = useMatches();

  // Check if any matched route has handle.noLayout = true
  const hideLayout = matches.some((match) => match.handle?.noLayout);
  return (
    <div className="w-full ">
      <Toaster position="top-center" />

      {!hideLayout && <Header />}
      
      <main className='mt-24'>
        <Outlet /> {/* Outlet renders nested routes */}
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;

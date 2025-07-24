import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet,useLocation,useMatches } from "react-router-dom";

function App() {
   const matches = useMatches();

  // Check if any matched route has handle.noLayout = true
  const hideLayout = matches.some((match) => match.handle?.noLayout);
  return (
    <div className="w-full ">
      {!hideLayout && <Header />}
      
      <main className='mt-24'>
        <Outlet /> {/* Outlet renders nested routes */}
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;

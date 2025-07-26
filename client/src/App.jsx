import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import { Outlet,useLocation,useMatches } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ScrollToTop from './components/ScrollToTop';


function App() {
  const matches = useMatches();
  const hideLayout = matches.some((match) => match.handle?.noLayout);

  return (

    <div className="w-full">
      {!hideLayout && <Header />}

      <ScrollToTop />
      
      <main className="mt-24">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;

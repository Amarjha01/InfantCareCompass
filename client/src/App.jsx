import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { Outlet, useMatches } from "react-router-dom";

function App() {
  const matches = useMatches();
  const hideLayout = matches.some((match) => match.handle?.noLayout);

  return (
    <div className="w-full">
      <CustomCursor />
      {!hideLayout && <Header />}
      
      <main className="mt-24">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;

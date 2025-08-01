import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useMatches } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollRestoration from "./components/ScrollRestoration";
import { Toaster, toast } from 'react-hot-toast';
function App() {
  const matches = useMatches();
  const hideLayout = matches.some((match) => match.handle?.noLayout);

  return (
    <div className="w-full">
      <ScrollRestoration />
      {!hideLayout && <Header />}

      <ScrollToTop />

      <main className="mt-24">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
      <ScrollToTop />
      <Toaster position="top-right" /> 
    </div>
  );
}

export default App;

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Outlet, useMatches } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

import FloatingScrollToTop from "./components/ScrollToTop";
// import CustomCursor from "./components/CustomCursor";

import ScrollToTop from "./components/ScrollToTop";
import ScrollRestoration from "./components/ScrollRestoration";

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
      <FloatingScrollToTop />
    </div>
  );
}

export default App;

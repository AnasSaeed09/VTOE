import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import { VirtualTryOn } from "./pages/VirtualTryOn";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useLoading } from "./context/LoadingContext";
import { FullScreenLoader } from "./components/FullScreenLoader";
import AiChat from "./components/AiChat";

const App = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && <FullScreenLoader />}
      {/* Notice Animation */}
      <div className="relative my-5 md:my-7">
        <div className="absolute bottom-0 z-10 h-full w-36 gradient-edge" />
        <div className="absolute bottom-0 z-10 h-full w-36 gradient-edge" />
        <div className="w-[100dvw] overflow-hidden relative h-5">
          <div className="marquee-box">
            <h1 className="text-xl font-bold text-color-change">Notice!.</h1>
            <p className="ml-2 text-xl font-semibold">
              This is not an
              <span className="ml-2 mr-2 text-color-change">
                AI generated site.
              </span>
              The text shown below as AI are actually animations done using
              <span className="ml-2 text-color-change">
                Framer Motion JS Library.
              </span>
            </p>
          </div>
        </div>
      </div>
      
      
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
        <ToastContainer />
        <AiChat />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />

          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/virtualtry-on/:productId/:size"
              element={<VirtualTryOn />}
            />
            <Route path="/verify" element={<Verify />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;

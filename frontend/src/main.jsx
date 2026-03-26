import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { ErrorBoundary } from 'react-error-boundary'
import FallbackUI from "./components/FallbackUI.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
 
 <BrowserRouter>
    <LoadingProvider>
      <ShopContextProvider>
        <ErrorBoundary
        FallbackComponent={FallbackUI}
        onError={(error, errorInfo) => console.error("Caught by ErrorBoundary:", error, errorInfo)}
        >
            <App />
        </ErrorBoundary>
      </ShopContextProvider>
    </LoadingProvider>
  </BrowserRouter>

);

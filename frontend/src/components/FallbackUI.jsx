// FallbackUI.jsx
 const FallbackUI = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>
        Oops 😥 <span className="inline-block p-2 text-2xl font-bold animate-bounce text-cyan-300">...</span>
        Something went wrong!
      </h1>
      <p className="mt-2 text-red-400">{error.message}</p>
      <button
        className="px-4 py-2 mt-4 text-white bg-black shadow-2xl cursor-pointer hover:shadow-amber-400 hover:bg-red-400 hover:text-black-50 active:text-white-50"
        onClick={resetErrorBoundary} // resets the boundary
      >
        Refresh / Try Again
      </button>
    </div>
  );
};
export default FallbackUI;
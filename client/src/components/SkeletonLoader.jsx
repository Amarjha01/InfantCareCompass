const SkeletonLoader = () => {
  return (
    <li className="mb-4 p-4 bg-slate-800 rounded-lg animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-slate-700"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-3 bg-slate-700 rounded w-full"></div>
          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
        </div>
      </div>
    </li>
  );
};

export default SkeletonLoader;
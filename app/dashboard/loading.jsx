const loading = () => {
  return (
    <div className="flex-col items-center justify-start gap-2">
      {/* create an array of 10  */}
      {Array.from({ length: 10 }, (_, i) => i + 1).map((_, i) => (
        <div key={i} className="mt-4 flex gap-2">
          <div className="h-7 w-7 animate-pulse rounded-full bg-slate-300"></div>
          <div className="h-8 w-full animate-pulse rounded-md bg-slate-200"></div>
        </div>
      ))}
    </div>
  );
};

export default loading;

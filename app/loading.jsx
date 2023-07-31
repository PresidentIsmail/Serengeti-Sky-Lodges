const loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white p-5">
      <span class="ml-2  flex items-center space-x-2 ">
        <div class="h-4 w-4 animate-bounce rounded-full border-2 border-black p-1 delay-100"></div>
        <div class="h-4 w-4 animate-bounce rounded-full border-2 border-black p-1 delay-200"></div>
        <div class="h-4 w-4 animate-bounce rounded-full border-2 border-black p-1 delay-300"></div>
      </span>
    </div>
  );
};

export default loading;

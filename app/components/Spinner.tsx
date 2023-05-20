const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative h-10 w-10">
        <div className="absolute  flex h-full w-full animate-spin-slower items-center justify-center rounded-full ">
          <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
          <div className="top-4.5 absolute left-5 h-0.5 w-5 rounded-sm bg-black"></div>
        </div>
        <div className="absolute flex h-full w-full animate-spin-slow items-center justify-center rounded-full ">
          <div className="absolute left-5 top-[19.5px] z-20 h-[1px] w-6 rounded-sm bg-black"></div>
        </div>
      </div>
      <div className="pl-5 text-sm">
        Loading
        <span>.</span>
        <span className="animate-[flicker_2s_steps(1,start)_infinite]">.</span>
        <span className="animate-[flickerAlt_2s_steps(1,start)_infinite]">
          .
        </span>
      </div>
    </div>
  );
};

export default Spinner;

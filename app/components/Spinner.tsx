const Spinner = ({ blue }: { blue?: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative h-12 w-12 ">
        <div className="flex h-full w-full items-center justify-center rounded-full ">
          <div
            className={`absolute z-10 h-3/4 w-3/4 rounded-full ${
              blue ? "bg-pale-amber lg:bg-sky-blue" : "bg-pale-amber"
            }`}
          ></div>
          <div className="absolute h-0.5 w-full bg-black"></div>
          <div className="absolute h-px w-full rotate-45 bg-black"></div>
          <div className="absolute h-0.5 w-full rotate-90 bg-black"></div>
          <div className="absolute h-px w-full -rotate-45 bg-black"></div>
          <div className="absolute z-20 h-1 w-1 rounded-full bg-black"></div>
        </div>

        <div className="absolute top-0 z-20 flex h-full w-full animate-spin-slower items-center justify-center  ">
          <div className="absolute left-5 z-20 h-0.5 w-5 rounded-sm bg-black"></div>
        </div>
        <div className="absolute top-0 z-20 flex h-full w-full animate-spin-slow items-center justify-center ">
          <div className="absolute left-5 z-20 h-[1px] w-6 rounded-sm bg-black"></div>
        </div>
      </div>

      <div className="">
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

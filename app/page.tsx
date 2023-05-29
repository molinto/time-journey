import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center px-4 pt-5 text-justify leading-9 md:max-w-2xl md:px-5 md:pt-10 xl:max-w-4xl xl:pt-20">
      <div
        className=" relative aspect-square
     h-1/3"
      >
        <Image src={"/watchFull.png"} alt="Watch Logo" fill />
      </div>
      <h1 className="py-5 text-xl ">Welcome to TimeJourney.</h1>
      <p>
        Get ready to test your knowledge of historical events and cultural
        trends. You'll be transported through time and space, exploring
        different eras and decades. From iconic moments in history to fashion
        fads, technological advancements to popular culture phenomena, this game
        will challenge your ability to connect images with their corresponding
        time periods and locations.
      </p>
    </div>
  );
}

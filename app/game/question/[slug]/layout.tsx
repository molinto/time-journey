"use client";

import Spinner from "@/app/components/Spinner";
import { useAppSelector } from "@/app/components/utils/reduxHooks";
import Image from "next/image";
import { useParams } from "next/navigation";

const QuestionLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();

  const currentQuestionNumber = parseInt(params.slug);

  const imageSrc = useAppSelector(
    (state) => state.questions?.value[currentQuestionNumber - 1]?.imageSrc
  );

  const loading = useAppSelector(
    (state) => state.questions.status === "loading"
  );

  return (
    <div className="flex w-full flex-col lg:h-full lg:flex-row">
      <div className="relative h-[60vh] w-full lg:h-full">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center py-4">
            <Spinner />
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt="Photo"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 75vw"
            className="z-10 object-contain px-4 py-2 lg:p-4"
          />
        )}
      </div>
      <div className="relative flex shrink-0 grow-0 flex-col items-center justify-start gap-5 bg-pale-amber p-4 lg:basis-[460px] lg:bg-sky-blue ">
        {children}
      </div>
    </div>
  );
};

export default QuestionLayout;

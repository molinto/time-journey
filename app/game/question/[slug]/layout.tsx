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

  return loading ? (
    <div className="flex h-full w-full items-center justify-center py-4">
      <Spinner />
    </div>
  ) : (
    <div className="flex w-full flex-col lg:h-full lg:flex-row">
      <div className="relative -z-10 h-[60vh] w-full bg-amber-100  lg:h-full">
        <Image
          src={imageSrc}
          alt="Photo"
          fill
          className="object-contain px-4 lg:p-4"
        />
      </div>
      <div className="relative flex shrink-0  flex-col items-center justify-start gap-5 p-4 lg:basis-[460px]  ">
        {children}
      </div>
    </div>
  );
};

export default QuestionLayout;

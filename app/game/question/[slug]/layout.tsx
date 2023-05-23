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
    <Spinner />
  ) : (
    <div className="flex h-full w-full">
      <div className="relative -z-10 h-full w-full bg-amber-100 ">
        <Image src={imageSrc} alt="Photo" fill className="object-contain p-4" />
      </div>
      <div className="relative flex min-w-[432px] flex-col items-center justify-start gap-5 p-4">
        {children}
      </div>
    </div>
  );
};

export default QuestionLayout;

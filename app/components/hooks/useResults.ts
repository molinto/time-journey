import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "../utils/reduxHooks";

const useResults = () => {
  const params = useParams();
  const currentQuestionNumber = parseInt(params.slug) - 1;
  // const nextUrl = useAppSelector(
  //   (state) => state.questions?.value[currentQuestionNumber + 1]?.imageSrc
  // );

  // const nextImage = new Image()
  // nextImage.src = nextUrl;

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  return { currentQuestionNumber };
};

export default useResults;

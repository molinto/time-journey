import { useParams } from "next/navigation";
import { useEffect } from "react";

const useResults = () => {
  const params = useParams();
  const currentQuestionNumber = parseInt(params.slug) - 1;

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  return { currentQuestionNumber };
};

export default useResults;

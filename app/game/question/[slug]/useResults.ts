import { useParams } from "next/navigation";

const useResults = () => {
  const params = useParams();
  const currentQuestionNumber = parseInt(params.slug) - 1;

  return { currentQuestionNumber };
};

export default useResults;

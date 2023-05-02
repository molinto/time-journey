import Button from "./Button";

interface QuestionProps {
  question: Question;
  onSubmit: () => void;
}

const Question = ({ question, onSubmit }: QuestionProps) => {
  return (
    <div className="">
      <div className="">{question.src}</div>
      <Button type="button" label={"Submit!"} onClick={onSubmit} />
    </div>
  );
};

export default Question;

import Button from "../components/Button";
import { useAppDispatch } from "../components/utils/reduxHooks";
import { reset } from "./gameSlice";

const Results = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="">
      <h1>CONGRATULATIONS! YOU LOAST.</h1>
      <Button
        label="New Game"
        type="button"
        onClick={() => dispatch(reset())}
      />
    </div>
  );
};

export default Results;

import { create } from "zustand";

interface State {
  currentQuestion: number;
  questions: {
    id: string;
    src: string;
  }[],
  game: {
    userAnswer?: Answer;
    dbAnswer?: Answer;
  }[];
}

interface Actions {
  reset: () => void;
  addUserAnswer: ({ id, answer }: AddAnswerProps) => void;
  addDbAnswer: ({ id, answer }: AddAnswerProps) => void;
}

interface AddAnswerProps {
  id: string;
  answer: Answer;
}

const initialState: State = {
  questions
  currentQuestion: 0,
  game: [],
};

const useGameStore = create<State & Actions>()((set) => ({
  ...initialState,

  reset: () => set(initialState),
  
  setQuestions: () => set(state => ({...state, }))

  nextQuestion: () =>
    set((state) => ({ ...state, currentQuestion: state.currentQuestion + 1 })),

  addUserAnswer: ({ id, answer }) =>
    set((state) => ({
      ...state,
      game: [
        ...state.game.map((question) => {
          if (question.id === id) {
            return { ...question, userAnswer: answer };
          }
          return question;
        }),
      ],
    })),
  addDbAnswer: ({ id, answer }) =>
    set((state) => ({
      ...state,
      game: [
        ...state.game.map((question) => {
          if (question.id === id) {
            return { ...question, dbAnswer: answer };
          }
          return question;
        }),
      ],
    })),
}));

export default useGameStore;

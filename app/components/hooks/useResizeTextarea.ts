import { useEffect } from "react";

const useAutosizeTextArea = (
  ref: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (ref) {
      ref.style.height = "0px";
      const scrollHeight = ref.scrollHeight;
      ref.style.height = scrollHeight + 2 + "px";
    }
  }, [ref, value]);
};

export default useAutosizeTextArea;

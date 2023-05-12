export const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.key === "Enter") {
    e.currentTarget.requestSubmit();
  }
};

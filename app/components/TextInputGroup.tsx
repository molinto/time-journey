interface TextareaInputGroupProps {
  label: string;
  value: string;
  handleAuthorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInputGroup = ({
  label,
  value,
  handleAuthorChange,
}: TextareaInputGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="author">{label}</label>
      <input
        type="text"
        className="w-full overflow-hidden rounded-md border bg-white p-4 font-light  outline-none disabled:cursor-not-allowed disabled:opacity-70"
        id="author"
        value={value}
        onChange={handleAuthorChange}
      />
    </div>
  );
};

export default TextInputGroup;

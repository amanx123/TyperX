const TypingArea = ({ input, onInputChange, onSpacebarPress }: any) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={input}
        onChange={onInputChange}
        onKeyDown={(e) => e.key === " " && onSpacebarPress()}
        className="border p-2 w-full"
      />
      <button
        onClick={onSpacebarPress}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Space
      </button>
    </div>
  );
};

export default TypingArea;

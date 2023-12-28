const Modal = ({ name, correct, incorrect, onClose }: any) => {
  const wpm = correct + ".0"
  const accuracy = correct == incorrect ? 0 : Math.round((correct / (correct + incorrect)) * 100)

  return (
    <div className="fixed inset-0 bg-black opacity-70">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lime-100 p-4 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Hello{" " + name}</h2>
          <span className="cursor-pointer text-3xl" onClick={onClose}>&times;</span>
        </div>
        <h2 className="text-xl font-light">Your average wpm is {" " + wpm}</h2>
        <p className="text-xl font-light mt-2">Your typing accuracy is {" " + accuracy + " %"}</p>
        <p className="text-xl font-semibold mt-8 mx-10">{Number(wpm) > 40 ? " Nice score 🔥🚀 " : "You need to improve bro 🙏"}</p>
      </div>
    </div>
  );
};

export default Modal;
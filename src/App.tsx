
import { useEffect, useRef, useState } from "react";
import { data } from "./data";
import Modal from "./Modal";
function App() {

  let dark;
  const [name, setName] = useState(localStorage.getItem('name') || "");
  const [showName, setShowName] = useState(localStorage.getItem('showName'))
  if (localStorage.getItem('darkMode') == 'true') {
    dark = true
  } else {
    dark = false
  }
  const [darkMode, setDarkMode] = useState(dark)
  const [text, setText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [timer, setTimer] = useState(60)
  const [color, setColor] = useState(true)
  const inputRef = useRef(false);

  useEffect(() => {
    let intervalId: any = ''
    // Start the timer when any key is pressed
    const handleKeyPress = () => {
      const tick = () => {
        // Decrease the timer every second
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      };

      intervalId = setInterval(tick, 1000);


    };

    if (inputRef.current == true) {
      handleKeyPress()
    }


    return () => {
      clearInterval(intervalId);

    };
  }, [inputRef.current]);



  useEffect(() => {
    const randomText = data[Math.floor(Math.random() * data.length)];
    setText(randomText);
  }, []);
  const words = text.split(" ")

  const handleEnter = (e: any) => {
    if (e.key == "Enter") {
      setShowName("true")
      localStorage.setItem('name', name)
      localStorage.setItem('showName', "true")
    }
  }

  const handleSetName = () => {
    if (name == "") {
      alert("Please enter a name 👀")
      return
    }
    localStorage.setItem('name', name)
    localStorage.setItem('showName', "true")
    setShowName(localStorage.getItem('showName'))
  }

  const handleReset = () => {
    localStorage.setItem('showName', "false")
    localStorage.setItem('name', '')
    setShowName('false')
    setName("")
  }

  const handleDarkMode = () => {

    if (darkMode == true && localStorage.getItem('darkMode') == 'true') {
      localStorage.setItem('darkMode', 'false')
      setDarkMode(false)
    } else {
      localStorage.setItem('darkMode', 'true')
      setDarkMode(true)
    }
  }

  const handleLetterChange = (e: any) => {
    setInputValue(e.target.value)
    const currentWord = words[currentWordIndex]
    if (currentWord.startsWith(inputValue)) {
      return setColor(() => true)
    }
    else {
      return setColor(() => false)
    }
  }

  const handleInputChange = (e: any) => {
    const typedValue = e.target.value.trim();
    const currentWord = words[currentWordIndex];

    if (typedValue === currentWord) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }

    // Move to the next word
    setCurrentWordIndex((prev) => prev + 1);
    setInputValue('');

    // You can add additional logic here, such as checking for the end of the test
  }

  return (
    <div className={`relative h-screen ${darkMode ? 'bg-stone-950' : 'bg-slate-200'} mx-auto`}>

      {/* Handling name input */}
      <div className="">
        <div className={`${showName == 'true' ? 'hidden' : 'space-x-4 items-center justify-center flex h-24 '}`}>
          <h1 className={`text-2xl font-bold font-mono ${darkMode ? 'text-white' : ''}`}>Enter Name :</h1>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="w-[20vw] focus:outline-none focus:ring-1 focus:ring-lime-300 rounded-md p-2 px-4" onKeyDown={handleEnter} />
          <button className="p-2 bg-lime-700 rounded-xl px-4 font-medium text-lg text-white" onClick={handleSetName}>Set Name</button>
        </div>

        <div className={`${showName == 'true' ? 'text-4xl font-semibold font-mono tracking-tight items-center justify-center flex h-20 ' : 'hidden'} ${darkMode ? 'text-white' : ''}`}>
          You are playing as <span className="text-orange-700 mx-3 justify-center font-bold">{" " + name}</span>
          <button className="p-2 text-lg font-sans bg-lime-700 rounded-xl px-4 font-medium mx-4 text-white" onClick={handleReset}>Reset</button>
        </div>

      </div>
      <button id='dark-mode' className={`absolute top-4 right-24 p-2 rounded-xl ml-40 text-lg px-4 ${darkMode ? 'bg-lime-900' : 'bg-neutral-900'} font-medium text-white`} onClick={handleDarkMode}>{darkMode ? "Light" : "Dark"}</button>

      {/* Main Application Part */}
      <p className="flex items-center justify-center mt-10 h-12 text-5xl gap-5">
        <span className="text-neutral-500">Correct: </span><span className="text-green-700 mr-10">{correctCount}</span> <span className="text-neutral-500">Incorrect: </span><span className="text-red-700">{incorrectCount}</span>
      </p>
      {timer == 0 ? <Modal correct={correctCount} incorrect={incorrectCount} name={name} onClose={() => window.location.reload()} />
        :
        <main className="items-center flex flex-col gap-20 justify-center mt-16">
          <div className={`h-[125px] w-[70vw] rounded-xl  ${darkMode ? 'bg-neutral-800' : 'bg-slate-300'} overflow-hidden drop-shadow-md`} >
            <div className="flex pl-10 my-auto py-8 ">
              <span className={`${color ? 'text-green-500' : 'text-red-500'} mr-4 text-6xl font-extralight`}>{words[currentWordIndex]}</span>
              {words.slice(currentWordIndex + 1).map((word, index) => (
                <p key={index} className={`mr-4 text-6xl font-extralight ${darkMode ? 'text-neutral-300' : ''}`}>
                  {word}
                </p>
              ))
              }
            </div>
          </div>
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={handleLetterChange}
              onKeyDown={(e) => {
                inputRef.current = true
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleInputChange(e);
                }
              }}
              className="p-2 rounded-lg w-[400px] focus:outline-none focus:ring-1 focus:ring-lime-600 text-xl px-4 h-[6vh] shadow-md"
              placeholder="Type here..."
            />
            <button onClick={() => window.location.reload()} className={`p-2 px-4 bg-lime-800 rounded-xl ml-8 text-white`}>Restart</button>
          </div>
          <div className={`${darkMode ? 'text-white' : ''} text-6xl font-thin`}>{timer}</div>
        </main>
      }
    </div>
  )
}

export default App;

import { useState, useCallback, useEffect, useRef} from "react"


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //ref huk
  const passwordRef = useRef(null)

  const passwordGenrator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "@!`~#$%^&*(]{|>/?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
  }, [password])

  // passwordGenrator()
  useEffect(()=>{
    passwordGenrator()
  },[length, numberAllowed, charAllowed, passwordGenrator])
  return (
    
      <>

      <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py3 my-8 text-orange-500 bg-gray-800 ">

        <h1 className=' text-center text-white font-bold my-3'>Password Generator</h1>


       
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 focus:bg-red-700  hover:bg-sky-700"
          
          >COPY</button>

        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked = {numberAllowed}
            id="numberInput"
            onChange={() => {
              setnumberAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked = {charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) =>!prev);
            }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>

        
      </div>

      // -------
      <div className="text-white flex justify-center">
<a href="https://www.instagram.com/reel/Cyv6eP6I8XH/?igshid=MTc4MmM1YmI2Ng==" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thankyou my pookie wookie</a>
</div>
      
    </>
  )
}

export default App

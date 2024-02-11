import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
    setCopied(false);

  }, [length, numberAllowed, charAllowed])

  function copyPasswordToClipboard() {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    setCopied(true);

  }

  <h3>Created by Mohibullah Rahimi in Jan 2024</h3>

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  return (

    < div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-900 text-green-500'>

      <h1 className='text-white text-center my-3'>Password Generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input

          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />

        <button

          onClick={copyPasswordToClipboard}
          className='outline-none bg-green-700 text-white px-3 py-0.5 shrink-0'
          enable={copied}
        >
          {copied ? 'Copied' : 'Copy'}

        </button>
      </div>
      <div
        className='flex text-sm gap-x-2'
      >
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={8}
            max={40}
            value={length}
            className='cursor-pointer bg-green-500'
            onChange={(e) => setLength(e.target.value)}
            name=""
            id=""
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            name=""
            id="" />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            name=""
            id="" />
          <label htmlFor="charInput">Character</label>
        </div>

      </div>
      <div className='bg-dark-800 text-gray-900 '>
        Free to use:

      </div>
      <h6>By Mohibullah Rahimi</h6>

    </div>
  )
}

export default App
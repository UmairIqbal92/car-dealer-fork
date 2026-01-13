"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"

interface CaptchaProps {
  onVerify: (isValid: boolean) => void
}

export default function Captcha({ onVerify }: CaptchaProps) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [mounted, setMounted] = useState(false)

  const generateNewCaptcha = useCallback(() => {
    const n1 = Math.floor(Math.random() * 10) + 1
    const n2 = Math.floor(Math.random() * 10) + 1
    setNum1(n1)
    setNum2(n2)
    setUserAnswer("")
    setIsValid(false)
    if (onVerify) {
      onVerify(false)
    }
  }, [onVerify])

  useEffect(() => {
    setMounted(true)
    generateNewCaptcha()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value
    setUserAnswer(answer)
    const correctAnswer = num1 + num2
    const valid = Number.parseInt(answer) === correctAnswer
    setIsValid(valid)
    if (onVerify) {
      onVerify(valid)
    }
  }

  if (!mounted) {
    return (
      <div className="space-y-3">
        <label className="block text-base font-semibold text-black">
          Security Check: Loading...
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="number"
            placeholder="Enter answer"
            disabled
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <label className="block text-base font-semibold text-black">
        Security Check: What is {num1} + {num2}? *
      </label>
      <div className="flex gap-3 items-center">
        <input
          type="number"
          value={userAnswer}
          onChange={handleChange}
          placeholder="Enter answer"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
          required
        />
        <button
          type="button"
          onClick={generateNewCaptcha}
          className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-black rounded-lg font-semibold transition-colors"
        >
          Refresh
        </button>
      </div>
      {userAnswer && (
        <p className={`text-sm ${isValid ? "text-green-600" : "text-red-600"}`}>
          {isValid ? "Correct!" : "Incorrect answer"}
        </p>
      )}
    </div>
  )
}

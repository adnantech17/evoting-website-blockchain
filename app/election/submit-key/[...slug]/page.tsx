'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Page({ params }: { params: { slug: string[] } }) {
  const [certificate, setCertificate] = useState('')
  const [partialKey, setPartialKey] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          certificate,
          partialKey,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || 'An error occurred while voting')
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Cast Your Vote</h1>
      {isSuccess && (
        <div className="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-500">
          Vote successful!
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-500">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="certificate" className="mb-2 block font-bold text-gray-500">
            Certificate
          </label>
          <textarea
            id="certificate"
            name="certificate"
            rows={5}
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-500 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="partial_key" className="mb-2 block font-bold text-gray-500">
            Partial Key
          </label>
          <input
            type="text"
            id="partial_key"
            name="parpartial_keytialKey"
            value={partialKey}
            onChange={(e) => setPartialKey(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-500 shadow focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-500 focus:outline-none"
        >
          {isLoading ? 'Wait...' : 'Submit Key'}
        </button>
      </form>
    </div>
  )
}
